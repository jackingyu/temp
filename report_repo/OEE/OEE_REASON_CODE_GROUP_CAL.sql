
 /********* Begin Procedure Script ************/
 BEGIN
 	DECLARE var_shift_duration_count int;
 	DECLARE var_shift_duration decimal;
 	DECLARE var_dev_run_time decimal;
 	DECLARE var_dev_stop_time decimal;


 	/** 班次时长  */
 	sql_select_all_shift = SELECT "SHIFT_DURATION","START_TIME","END_TIME","HANDLE","SITE","RESOURCE_BO","START_DATE_TIME","RESOURCE_STATE","END_DATE_TIME","REASON_CODE_GROUP","DESCRIPTION","REASON_CODE","SHIFT" FROM "_SYS_BIC"."com.andon.report.oee/OEE_AVAILABILITY_SHIFT_DURATION"
			 	WHERE SITE=:site
			 	AND RESOURCE_BO IN (:resourceBo)
			 	AND CAST(START_DATE_TIME AS DATE) >= :startDate
			 	AND CAST(START_DATE_TIME AS DATE) <= :endDate;

	sql_slice_dev_by_day = SELECT /** 设备时间按天切片 */
				B.HANDLE AS SHIFT_BO,
				B.SHIFT,
				B.DESCRIPTION AS SHIFT_DESC,
				B.START_TIME AS SHIFT_START_TIME,
				B.END_TIME AS SHIFT_END_TIME,
				B.SHIFT_DURATION,
				B.START_DATE_TIME,
				B.END_DATE_TIME,
				B.RESOURCE_BO,
				B.RESOURCE_STATE,
				B.REASON_CODE_GROUP,
				B.REASON_CODE,
				A.ROW_ID,
				CAST(ADD_DAYS(B.START_DATE_TIME, A.ROW_ID) AS  DATE) AS DEV_DATE
				FROM MHP.REPORT_INDEX AS A
				INNER JOIN :sql_select_all_shift AS B
				ON A.ROW_ID <= DAYS_BETWEEN(B.START_DATE_TIME, B.END_DATE_TIME);

	sql_calculate_slice_dev_start_end_time = SELECT	/** 计算设备时间切片后的起始时间 */
				SHIFT_BO,
				SHIFT,
				SHIFT_DESC,
				SHIFT_START_TIME,
				SHIFT_END_TIME,
				SHIFT_DURATION,
				CASE WHEN START_DATE_TIME > DEV_DATE THEN START_DATE_TIME ELSE DEV_DATE END AS DEV_START_DATE_TIME,
				CASE WHEN END_DATE_TIME < ADD_DAYS(DEV_DATE, 1) THEN END_DATE_TIME ELSE ADD_DAYS(DEV_DATE, 1) END AS DEV_END_DATE_TIME,
				RESOURCE_BO,
				RESOURCE_STATE,
				REASON_CODE_GROUP,
				REASON_CODE,
				DEV_DATE
				FROM :sql_slice_dev_by_day;



	sql_calculate_shift_start_time = SELECT /** 计算班次开始时间 */
				SHIFT_BO,
				SHIFT,
				SHIFT_DESC,
				SHIFT_DURATION,
				SHIFT_START_TIME,
				SHIFT_END_TIME,
				DEV_START_DATE_TIME,
				DEV_END_DATE_TIME,
				RESOURCE_BO,
				RESOURCE_STATE,
				REASON_CODE_GROUP,
				REASON_CODE,
				DEV_DATE,
				CAST(CAST(DEV_DATE AS NVARCHAR) || ' ' || CAST(SHIFT_START_TIME AS NVARCHAR) AS SECONDDATE) AS SHIFT_START_DATE_TIME
				FROM :sql_calculate_slice_dev_start_end_time;

	sql_calculate_shift_end_time = SELECT /** 计算班次结束时间 */
				SHIFT_BO,
				SHIFT,
				SHIFT_DESC,
				SHIFT_DURATION,
				DEV_START_DATE_TIME,
				DEV_END_DATE_TIME,
				RESOURCE_BO,
				RESOURCE_STATE,
				REASON_CODE_GROUP,
				REASON_CODE,
				DEV_DATE,
				SHIFT_START_DATE_TIME,
				ADD_SECONDS(SHIFT_START_DATE_TIME, SHIFT_DURATION) AS SHIFT_END_DATE_TIME
				FROM :sql_calculate_shift_start_time;




	sql_calculate_intersection_time = SELECT /** 计算交集时间 */
				SHIFT_BO,
				SHIFT,
				SHIFT_DESC,
				SHIFT_DURATION,
				SHIFT_START_DATE_TIME,
				SHIFT_END_DATE_TIME,
				DEV_START_DATE_TIME,
				DEV_END_DATE_TIME,
				RESOURCE_BO,
				RESOURCE_STATE,
				REASON_CODE_GROUP,
				REASON_CODE,
				CASE WHEN SHIFT_START_DATE_TIME > DEV_START_DATE_TIME THEN SHIFT_START_DATE_TIME ELSE DEV_START_DATE_TIME END AS INTERSECTION_START_TIME,
				CASE WHEN SHIFT_END_DATE_TIME < DEV_END_DATE_TIME THEN SHIFT_END_DATE_TIME ELSE DEV_END_DATE_TIME END AS INTERSECTION_END_TIME
				FROM :sql_calculate_shift_end_time;

	sql_calculate_intersection_duration = SELECT /** 计算交集时长（含负数）  */
				SHIFT_BO,
				SHIFT,
				SHIFT_DESC,
				SHIFT_DURATION,
				SHIFT_START_DATE_TIME,
				SHIFT_END_DATE_TIME,
				DEV_START_DATE_TIME,
				DEV_END_DATE_TIME,
				RESOURCE_BO,
				RESOURCE_STATE,
				REASON_CODE_GROUP,
				REASON_CODE,
				INTERSECTION_START_TIME,
				INTERSECTION_END_TIME,
				SECONDS_BETWEEN(INTERSECTION_START_TIME, INTERSECTION_END_TIME) AS INTERSECTION_TIME_DURATION
				FROM :sql_calculate_intersection_time;

	sql_calculate_intersection_duration_exclude_out_time = SELECT /** 计算交集时长（不含负数）  */
				SHIFT_BO,
				SHIFT,
				SHIFT_DESC,
				SHIFT_DURATION,
				SHIFT_START_DATE_TIME,
				SHIFT_END_DATE_TIME,
				DEV_START_DATE_TIME,
				DEV_END_DATE_TIME,
				RESOURCE_BO,
				RESOURCE_STATE,
				REASON_CODE_GROUP,
				REASON_CODE,
				INTERSECTION_START_TIME,
				INTERSECTION_END_TIME,
				INTERSECTION_TIME_DURATION
				FROM :sql_calculate_intersection_duration
				WHERE INTERSECTION_TIME_DURATION > 0;

	/** 设备运行时长  */
	sql_calculate_run_time = SELECT /** 计算运行时长 */
				SHIFT_BO,
				SHIFT,
				SHIFT_DESC,
				SHIFT_DURATION,
				SHIFT_START_DATE_TIME,
				SHIFT_END_DATE_TIME,
				DEV_START_DATE_TIME,
				DEV_END_DATE_TIME,
				RESOURCE_BO,
				RESOURCE_STATE,
				REASON_CODE_GROUP,
				REASON_CODE,
				INTERSECTION_START_TIME AS RUN_START_TIME,
				INTERSECTION_END_TIME AS RUN_END_TIME,
				INTERSECTION_TIME_DURATION AS RUN_TIME_DURATION
				FROM :sql_calculate_intersection_duration_exclude_out_time
				WHERE RESOURCE_STATE='P';

	sql_run_time_duration_group_by_shift = SELECT /** 按班次分组，合计运行时长 */
				SHIFT_BO,
				SHIFT,
				SHIFT_DESC,
				SHIFT_DURATION,
				SHIFT_START_DATE_TIME,
				SHIFT_END_DATE_TIME,
				SUM(RUN_TIME_DURATION) AS RUN_TIME_DURATION_SUM
				FROM :sql_calculate_run_time
				GROUP BY SHIFT_BO, SHIFT, SHIFT_DESC, SHIFT_START_DATE_TIME, SHIFT_END_DATE_TIME, SHIFT_DURATION;

 	/** 设备计划停机时长  */
	sql_calculate_stop_time = SELECT /** 计算停机时长 */
				SHIFT_BO,
				SHIFT,
				SHIFT_DESC,
				SHIFT_DURATION,
				SHIFT_START_DATE_TIME,
				SHIFT_END_DATE_TIME,
				DEV_START_DATE_TIME,
				DEV_END_DATE_TIME,
				RESOURCE_STATE,
				REASON_CODE_GROUP,
				REASON_CODE,
				INTERSECTION_START_TIME AS STOP_START_TIME,
				INTERSECTION_END_TIME AS STOP_END_TIME,
				INTERSECTION_TIME_DURATION AS STOP_TIME_DURATION
				FROM :sql_calculate_intersection_duration_exclude_out_time
				WHERE REASON_CODE_GROUP='SD00';

	sql_stop_time_duration_group_by_shift = SELECT /** 按帮次分组，合计停机时长 */
				SHIFT_BO,
				SHIFT,
				SHIFT_DESC,
				SHIFT_START_DATE_TIME,
				SHIFT_END_DATE_TIME,
				SHIFT_DURATION,
				SUM(STOP_TIME_DURATION) AS STOP_TIME_DURATION_SUM
				FROM :sql_calculate_stop_time
				GROUP BY SHIFT_BO, SHIFT, SHIFT_DESC, SHIFT_START_DATE_TIME, SHIFT_END_DATE_TIME, SHIFT_DURATION;



	/** 设备运行时长、班次时长、设备停机时长 */
	sql_run_and_stop_duration = SELECT
				R.SHIFT_BO,
				R.SHIFT,
				R.SHIFT_DESC,
				R.SHIFT_DURATION,
				R.SHIFT_START_DATE_TIME,
				R.SHIFT_END_DATE_TIME,
				R.RUN_TIME_DURATION_SUM,
				S.STOP_TIME_DURATION_SUM
				FROM :sql_run_time_duration_group_by_shift AS R
				/** FULL JOIN :sql_stop_time_duration_group_by_shift AS S  */ /** 说明：会有只有运行时间，没有停机时间的状况，先忽略这种状况，不处理 */
				INNER JOIN :sql_stop_time_duration_group_by_shift AS S
				ON R.SHIFT_BO = S.SHIFT_BO
				AND R.SHIFT_START_DATE_TIME = S.SHIFT_START_DATE_TIME
				AND R.SHIFT_END_DATE_TIME = S.SHIFT_END_DATE_TIME
				AND R.SHIFT_DURATION = S.SHIFT_DURATION;

	/** Availability */
	sql_availability = SELECT
				SHIFT_BO,
				SHIFT,
				SHIFT_DESC,
				SHIFT_START_DATE_TIME,
				SHIFT_END_DATE_TIME,
				SHIFT_DURATION,
				RUN_TIME_DURATION_SUM,
				STOP_TIME_DURATION_SUM,
				(RUN_TIME_DURATION_SUM / (SHIFT_DURATION - STOP_TIME_DURATION_SUM)) AS A
				FROM :sql_run_and_stop_duration;



	/************************************** 华丽的分割线 **************************************/

	/** Performance */
	sql_shift_follow_up = SELECT
				S.SHIFT_BO,
				S.SHIFT,
				S.SHIFT_DESC,
				S.SHIFT_DURATION,
				S.SHIFT_START_DATE_TIME,
				S.SHIFT_END_DATE_TIME,
				FU.QTY_YIELD,
				FU.QTY_SCRAP,
				FU.QTY_UNCONFIRM,
				FU.RESRCE,
				FU.ITEM
				FROM MHP.RESRCE AS R
				INNER JOIN MHP.PRODUCTION_OUTPUT_FOLLOW_UP AS FU ON FU.SITE=R.SITE AND FU.RESRCE=R.RESRCE
				INNER JOIN :sql_calculate_intersection_duration_exclude_out_time AS S ON S.RESOURCE_BO=R.HANDLE
				WHERE FU.SITE=:site
				AND CAST(FU.START_DATE_TIME AS DATE) >= :startDate
			 	AND CAST(FU.START_DATE_TIME AS DATE) <= :endDate
				AND FU.QTY_UNCONFIRM='0';

	sql_shift_follow_up_sum = SELECT
				SHIFT_BO,
				SHIFT,
				SHIFT_DESC,
				SHIFT_DURATION,
				SHIFT_START_DATE_TIME,
				SHIFT_END_DATE_TIME,
				SUM(QTY_YIELD) AS QTY_YIELD,
				SUM(QTY_SCRAP) AS QTY_SCRAP,
				SUM(QTY_UNCONFIRM) AS QTY_UNCONFIRM
				FROM :sql_shift_follow_up
				GROUP BY SHIFT_BO, SHIFT, SHIFT_DESC, SHIFT_START_DATE_TIME, SHIFT_END_DATE_TIME, SHIFT_DURATION;

	sql_performance_and_availability = SELECT
				AV.SHIFT_BO,
				AV.SHIFT,
				AV.SHIFT_DESC,
				AV.SHIFT_DURATION,
				AV.SHIFT_START_DATE_TIME,
				AV.SHIFT_END_DATE_TIME,
				AV.RUN_TIME_DURATION_SUM,
				AV.STOP_TIME_DURATION_SUM,
				AV.A,
				PE.QTY_YIELD,
				PE.QTY_SCRAP,
				PE.QTY_UNCONFIRM
				FROM :sql_shift_follow_up_sum AS PE
				INNER JOIN :sql_availability AS AV  /** 说明：用inner join，就会排除完全没有停机时间或者完全没有运行时间的记录 */
					ON AV.SHIFT_BO=PE.SHIFT_BO
					AND AV.SHIFT=PE.SHIFT
					AND AV.SHIFT_DESC=PE.SHIFT_DESC
					AND AV.SHIFT_START_DATE_TIME=PE.SHIFT_START_DATE_TIME
					AND AV.SHIFT_END_DATE_TIME=PE.SHIFT_END_DATE_TIME
					AND AV.SHIFT_DURATION=PE.SHIFT_DURATION;

	sql_cycle_time = SELECT
				P.SHIFT_BO,
				P.SHIFT,
				P.SHIFT_DESC,
				P.SHIFT_DURATION,
				P.SHIFT_START_DATE_TIME,
				P.SHIFT_END_DATE_TIME,
				STD.STD_CYCLE_TIME
				FROM :sql_shift_follow_up AS P
				INNER JOIN MHP.STD_CYCLE_TIME AS STD ON STD.RESRCE=P.RESRCE AND STD.ITEM=P.ITEM
				WHERE STD.SITE=:site
				AND STD.START_DATE >= :startDate
			 	AND STD.START_DATE <= :endDate;

	sql_cycle_time_sum = SELECT
				SHIFT_BO,
				SHIFT,
				SHIFT_DESC,
				SHIFT_DURATION,
				SHIFT_START_DATE_TIME,
				SHIFT_END_DATE_TIME,
				SUM(STD_CYCLE_TIME) AS STD_CYCLE_TIME_SUM
				FROM :sql_cycle_time
				GROUP BY SHIFT_BO, SHIFT, SHIFT_DESC, SHIFT_START_DATE_TIME, SHIFT_END_DATE_TIME, SHIFT_DURATION;


	sql_performance_and_availability_and_cycle_time = SELECT
				PA.SHIFT_BO,
				PA.SHIFT,
				PA.SHIFT_DESC,
				PA.SHIFT_DURATION,
				PA.SHIFT_START_DATE_TIME,
				PA.SHIFT_END_DATE_TIME,
				PA.RUN_TIME_DURATION_SUM,
				PA.STOP_TIME_DURATION_SUM,
				PA.A,
				PA.QTY_YIELD,
				PA.QTY_SCRAP,
				PA.QTY_UNCONFIRM,
				CY.STD_CYCLE_TIME_SUM
				FROM :sql_performance_and_availability AS PA
				INNER JOIN :sql_cycle_time_sum AS CY  /** 说明：inner join后，数据就变成排除完全没有停机时间或者完全没有运行时间的记录了  */
					ON CY.SHIFT_BO=PA.SHIFT_BO
					AND CY.SHIFT=PA.SHIFT
					AND CY.SHIFT_DESC=PA.SHIFT_DESC
					AND CY.SHIFT_START_DATE_TIME=PA.SHIFT_START_DATE_TIME
					AND CY.SHIFT_END_DATE_TIME=PA.SHIFT_END_DATE_TIME
					AND CY.SHIFT_DURATION=PA.SHIFT_DURATION;


	sql_calculate_performance = SELECT
				SHIFT_BO,
				SHIFT,
				SHIFT_DESC,
				SHIFT_DURATION,
				SHIFT_START_DATE_TIME,
				SHIFT_END_DATE_TIME,
				RUN_TIME_DURATION_SUM,
				STOP_TIME_DURATION_SUM,
				A,
				QTY_YIELD,
				QTY_SCRAP,
				QTY_UNCONFIRM,
				STD_CYCLE_TIME_SUM,
				(STD_CYCLE_TIME_SUM * (QTY_YIELD + QTY_SCRAP) / RUN_TIME_DURATION_SUM) AS P
				FROM :sql_performance_and_availability_and_cycle_time;

 	/** sql_run_time_duration_exclude_out_time  sql_stop_time_duration_exclude_out_time */



	/************************************** 华丽的分割线 **************************************/

	/** Quality */

	sql_calculate_quality = SELECT
				SHIFT_BO,
				SHIFT,
				SHIFT_DESC,
				SHIFT_DURATION,
				SHIFT_START_DATE_TIME,
				SHIFT_END_DATE_TIME,
				RUN_TIME_DURATION_SUM,
				STOP_TIME_DURATION_SUM,
				A,
				QTY_YIELD,
				QTY_SCRAP,
				QTY_UNCONFIRM,
				STD_CYCLE_TIME_SUM,
				P,
				(QTY_YIELD / (QTY_YIELD + QTY_SCRAP)) AS Q
				FROM :sql_calculate_performance;


 	/************************************** 华丽的分割线 **************************************/

 	/** OEE */
 	sql_calculate_oee = SELECT
 				SHIFT_BO,
 				SHIFT,
 				SHIFT_DESC,
 				SHIFT_DURATION,
				SHIFT_START_DATE_TIME,
				SHIFT_END_DATE_TIME,
				RUN_TIME_DURATION_SUM,
				STOP_TIME_DURATION_SUM,
				A,
				QTY_YIELD,
				QTY_SCRAP,
				QTY_UNCONFIRM,
				STD_CYCLE_TIME_SUM,
				P,
				Q,
				(A*P*Q) AS OEE,
				CASE WHEN :byTimeType='M' THEN CONCAT(CONCAT(YEAR(SHIFT_START_DATE_TIME),'-'),MONTH(SHIFT_START_DATE_TIME))
		 		WHEN :byTimeType='W' THEN ISOWEEK (SHIFT_START_DATE_TIME)
		 		WHEN :byTimeType='D' THEN TO_NVARCHAR(TO_DATE(SHIFT_START_DATE_TIME))
		 		ELSE SHIFT END AS BY_TIME
				FROM :sql_calculate_quality;

 	sql_oee_average = SELECT
				BY_TIME,
				AVG(A) AS A,
		 		AVG(P) AS P,
		 		AVG(Q) AS Q,
				AVG(OEE) AS OEE
				FROM :sql_calculate_oee
				GROUP BY BY_TIME;




 	/************************************** 华丽的分割线 **************************************/


 	/** 原因代码分布计算 */
 	sql_reason_code = SELECT
 				REASON_CODE,
 				SUM(INTERSECTION_TIME_DURATION) AS INTERSECTION_TIME_DURATION_SUM
 				FROM :sql_calculate_intersection_duration_exclude_out_time
 				GROUP BY REASON_CODE;

 	/** 原因代码组分布计算方法 */
 	sql_reason_code_group = SELECT
 				REASON_CODE_GROUP,
 				SUM(INTERSECTION_TIME_DURATION) AS INTERSECTION_TIME_DURATION_SUM
 				FROM :sql_calculate_intersection_duration_exclude_out_time
 				GROUP BY REASON_CODE_GROUP;


	var_out = SELECT *, 1 AS QTY FROM :sql_reason_code_group;


END /********* End Procedure Script ************/


