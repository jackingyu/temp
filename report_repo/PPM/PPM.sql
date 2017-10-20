 
 /********* Begin Procedure Script ************/ 
 BEGIN 
 	/**设备基本信息**/
	var_resrce = SELECT 
				 HANDLE,
				 SITE,
				 RESRCE,
				 ASSET,
				 DESCRIPTION,
				 WORK_AREA,
				 LINE_AREA
				 FROM MHP.RESRCE
				 WHERE SITE = :site_in;
	
	 /**FILTER WORK_AREA **/
 	 var_resrce = APPLY_FILTER(:var_resrce, :work_center_in);
 	 /**FILTER LINE_AREA **/
 	 var_resrce = APPLY_FILTER(:var_resrce, :line_in);
 	 /**FILTER RESRCE **/
 	 var_resrce = APPLY_FILTER(:var_resrce, :resrce_in);
 	 		 
 
    /**设备,生产区域, 拉线**/
 	var_first = SELECT 
				A.HANDLE, 
				A.SITE,
				A.RESRCE, 
				A.ASSET,
				A.DESCRIPTION, 
				A.WORK_AREA, 
				B.DESCRIPTION AS WORK_AREA_DES, 
				B.HANDLE AS WORK_AREA_HANDLE, 
				A.LINE_AREA, 
				C.DESCRIPTION AS LINE_AREA_DES
				FROM :var_resrce AS A
				LEFT JOIN MHP.WORK_CENTER AS B
				ON A.WORK_AREA = B.WORK_CENTER AND A.SITE = B.SITE
				LEFT JOIN MHP.WORK_CENTER AS C
				ON A.LINE_AREA = C.WORK_CENTER AND A.SITE = C.SITE
				WHERE A.SITE = :site_in;
	
 
     /**设备, 班次**/
     var_second = SELECT 
				  A.HANDLE, 
				  A.SITE,
				  A.RESRCE, 
				  A.ASSET,
				  A.DESCRIPTION, 
				  A.WORK_AREA, 
				  A.WORK_AREA_DES, 
				  A.LINE_AREA, 
				  A.LINE_AREA_DES,
				  B.SHIFT, 
				  B.START_TIME, 
				  B.END_TIME, 
				  B.SHIFT_DURATION, 
				  B.DESCRIPTION AS SHIFT_DES, 
				  B.HANDLE AS SHIFT_HANDLE 
				  FROM :var_first AS A
				  INNER JOIN MHP.WORK_CENTER_SHIFT AS B
				  ON A.WORK_AREA_HANDLE = B.WORK_CENTER_BO
				  WHERE B.ENABLED = 'true';
		  
	
	 /** 日志记录 **/
	 var_timelog = SELECT 
	               RESOURCE_BO,
	               RESOURCE_STATE,
	               ELAPSED_TIME,
	               STRT
	               FROM MHP.RESOURCE_TIME_LOG
	               WHERE CAST(START_DATE_TIME AS DATE) >= :start_date_in
				   AND CAST(START_DATE_TIME AS DATE) <= ADD_DAYS(CAST(:end_date_in AS DATE),1)
				   AND RESOURCE_STATE = 'P'
				   AND ELAPSED_TIME > :activity_param_01_in *60*1000;

	
	 /**设备, 班次, 日志记录**/  
     var_third =  SELECT
				  A.HANDLE, 
				  A.SITE,
				  A.RESRCE, 
				  A.ASSET,
				  A.DESCRIPTION, 
				  A.WORK_AREA, 
				  A.WORK_AREA_DES, 
				  A.LINE_AREA, 
				  A.LINE_AREA_DES,
				  A.SHIFT, 
				  A.SHIFT_HANDLE,
				  A.START_TIME, 
				  A.END_TIME, 
				  A.SHIFT_DURATION, 
				  A.SHIFT_DES, 
				  B.ELAPSED_TIME,
				  TO_TIMESTAMP(B.STRT, 'YYYYMMDD.HH24MISS.FF7') AS START_DATE_TIME,
				  ADD_SECONDS(TO_TIMESTAMP(B.STRT, 'YYYYMMDD.HH24MISS.FF7'),B.ELAPSED_TIME/1000) AS END_DATE_TIME
				  FROM :var_second AS A
				  INNER JOIN :var_timelog AS B
				  ON A.HANDLE = B.RESOURCE_BO;
		
	 /** 日志记录时间切割 */		  
     sql_slice_dev_by_day = SELECT 
							A.HANDLE, 
				  			A.SITE,
				  			A.RESRCE, 
				  			A.ASSET,
				  			A.DESCRIPTION, 
				  			A.WORK_AREA, 
				  			A.WORK_AREA_DES, 
				  			A.LINE_AREA, 
				  			A.LINE_AREA_DES,
				 	 		A.SHIFT, 
				  			A.SHIFT_HANDLE,
				  			A.START_TIME, 
				  			A.END_TIME, 
				  			A.SHIFT_DURATION, 
				  			A.SHIFT_DES, 
				  			A.ELAPSED_TIME,
				  			A.START_DATE_TIME,
				  			A.END_DATE_TIME,
				  			B.ROW_ID,
							CAST(ADD_DAYS(A.START_DATE_TIME, B.ROW_ID) AS  DATE) AS DEV_DATE
							--CAST(CAST(CAST(ADD_DAYS(A.START_DATE_TIME, B.ROW_ID) AS  DATE) AS NVARCHAR) || ' ' || CAST(START_TIME AS NVARCHAR) AS SECONDDATE) AS DEV_DATE
							FROM MHP.REPORT_INDEX AS B
							INNER JOIN :var_third AS A
							ON B.ROW_ID <= DAYS_BETWEEN(A.START_DATE_TIME, A.END_DATE_TIME);
							
	   /** 计算设备时间切片后的起始时间
       sql_start_end_time = SELECT	
							HANDLE, 
				  			SITE,
				  			RESRCE, 
				  			ASSET,
				  			DESCRIPTION, 
				  			WORK_AREA, 
				  			WORK_AREA_DES, 
				  			LINE_AREA, 
				  			LINE_AREA_DES,
				 	 		SHIFT, 
				  			SHIFT_HANDLE,
				  			START_TIME, 
				  			END_TIME, 
				  			SHIFT_DURATION, 
				  			SHIFT_DES, 
				  			ELAPSED_TIME,
				  			DEV_DATE,
							CASE WHEN START_DATE_TIME > DEV_DATE THEN START_DATE_TIME ELSE DEV_DATE END AS START_DATE_TIME, 
							--CASE WHEN END_DATE_TIME < ADD_DAYS(DEV_DATE, 1) THEN END_DATE_TIME ELSE ADD_DAYS(DEV_DATE, 1) END AS END_DATE_TIME
							CASE WHEN END_DATE_TIME < ADD_SECONDS(DEV_DATE, SHIFT_DURATION) THEN END_DATE_TIME ELSE ADD_SECONDS(DEV_DATE, SHIFT_DURATION) END AS END_DATE_TIME
							FROM :sql_slice_dev_by_day;
		 */
		
	   /**  班次开始时间拼接  */ 	
	   var_fourth = SELECT 
	     			HANDLE, 
	     			SITE,
				  	RESRCE, 
				  	ASSET,
				  	DESCRIPTION, 
				  	WORK_AREA, 
				  	WORK_AREA_DES, 
				  	LINE_AREA, 
				  	LINE_AREA_DES,
				  	SHIFT, 
				  	SHIFT_HANDLE,
				  	START_TIME, 
				  	END_TIME, 
				  	SHIFT_DURATION, 
				  	SHIFT_DES, 
				  	ELAPSED_TIME,
				  	START_DATE_TIME,
				  	END_DATE_TIME,
				  	DEV_DATE,
				    CAST(CAST(DEV_DATE AS NVARCHAR) || ' ' || CAST(START_TIME AS NVARCHAR) AS SECONDDATE) AS SHIFT_START_DATE_TIME
				    FROM :sql_slice_dev_by_day;
			  
				  
	  /**班次 结束时间**/	
	  var_fifth =   SELECT 
				  	HANDLE, 
				  	SITE,
				  	RESRCE, 
				  	ASSET,
				  	DESCRIPTION, 
				  	WORK_AREA, 
				  	WORK_AREA_DES, 
				  	LINE_AREA, 
				  	LINE_AREA_DES,
				  	SHIFT, 
				  	SHIFT_HANDLE,
				  	START_TIME, 
				  	END_TIME, 
				  	SHIFT_DURATION, 
				  	SHIFT_DES, 
				  	ELAPSED_TIME,
				  	START_DATE_TIME,
				  	END_DATE_TIME,
				  	SHIFT_START_DATE_TIME,
				  	--CAST(CAST(DEV_DATE AS NVARCHAR) || ' ' || CAST(END_TIME AS NVARCHAR) AS SECONDDATE) AS SHIFT_END_DATE_TIME
				 	ADD_SECONDS(SHIFT_START_DATE_TIME, SHIFT_DURATION) AS SHIFT_END_DATE_TIME
					FROM :var_fourth;
				
		
	  /** 计算交集时间 */		  
	 var_sixth =    SELECT
					HANDLE, 
					SITE,
				  	RESRCE, 
				  	ASSET,
				  	DESCRIPTION, 
				  	WORK_AREA, 
				  	WORK_AREA_DES, 
				  	LINE_AREA, 
				  	LINE_AREA_DES,
				  	SHIFT, 
				  	SHIFT_HANDLE,
				  	START_TIME, 
				  	END_TIME, 
				  	SHIFT_DURATION, 
				  	SHIFT_DES, 
				  	START_DATE_TIME, 
				  	END_DATE_TIME, 
				  	ELAPSED_TIME,
				  	SHIFT_START_DATE_TIME,
				  	SHIFT_END_DATE_TIME,
					CASE WHEN SHIFT_START_DATE_TIME > START_DATE_TIME THEN SHIFT_START_DATE_TIME ELSE START_DATE_TIME END AS INTERSECTION_START_TIME,
					CASE WHEN SHIFT_END_DATE_TIME < END_DATE_TIME THEN SHIFT_END_DATE_TIME ELSE END_DATE_TIME END AS INTERSECTION_END_TIME
					FROM :var_fifth;		  
	  
	  /** 计算交集时长（含负数）  */
	  var_seventh = SELECT 
				    HANDLE, 
				    SITE,
				  	RESRCE, 
				  	ASSET,
				  	DESCRIPTION, 
				  	WORK_AREA, 
				  	WORK_AREA_DES, 
				  	LINE_AREA, 
				  	LINE_AREA_DES,
				  	SHIFT, 
				  	SHIFT_HANDLE,
				  	START_TIME, 
				  	END_TIME, 
				  	SHIFT_DURATION, 
				  	SHIFT_DES, 
				  	START_DATE_TIME, 
				  	END_DATE_TIME, 
				  	ELAPSED_TIME,
				  	SHIFT_START_DATE_TIME,
				  	SHIFT_END_DATE_TIME,
				  	INTERSECTION_START_TIME,
				  	INTERSECTION_END_TIME,
				  	CASE WHEN INTERSECTION_START_TIME = START_DATE_TIME 
				  	AND INTERSECTION_END_TIME = END_DATE_TIME THEN ELAPSED_TIME/1000/60.0 ELSE 
					SECONDS_BETWEEN(INTERSECTION_START_TIME, INTERSECTION_END_TIME)/60.0
					END AS INTERSECTION_TIME_DURATION
					FROM :var_sixth;
	
	  /** 计算交集时长（不含负数）  */				
	  var_eighth =  SELECT 
				    HANDLE, 
				    SITE,
				  	RESRCE, 
				  	ASSET,
				  	DESCRIPTION, 
				  	WORK_AREA, 
				  	WORK_AREA_DES, 
				  	LINE_AREA, 
				  	LINE_AREA_DES,
				  	SHIFT, 
				  	SHIFT_HANDLE,
				  	START_TIME, 
				  	END_TIME, 
				  	SHIFT_DURATION, 
				  	SHIFT_DES, 
				  	START_DATE_TIME, 
				  	END_DATE_TIME, 
				  	ELAPSED_TIME,
				  	SHIFT_START_DATE_TIME,
				  	SHIFT_END_DATE_TIME,
				  	INTERSECTION_START_TIME,
				  	INTERSECTION_END_TIME,
				  	INTERSECTION_TIME_DURATION
					FROM :var_seventh
					WHERE INTERSECTION_TIME_DURATION > :activity_param_01_in;
					
		/** PRODUCTION_OUTPUT_REALTIME + ITEM (先过滤产量表)  */		
		var_tenth = SELECT 
					A.SITE, 
					A.RESRCE,
					A.ITEM, 
					A.START_DATE_TIME, 
					A.END_DATE_TIME, 
					A.QTY_YIELD, 
					A.QTY_SCRAP, 
					A.QTY_INPUT, 
					A.QTY_TOTAL ,
					B.MODEL,
					B.DESCRIPTION AS ITEM_DES
					FROM MHP.PRODUCTION_OUTPUT_REALTIME AS A
					LEFT JOIN MHP.ITEM AS B
					ON A.SITE = B.SITE AND A.ITEM = B.ITEM
					WHERE CAST(A.START_DATE_TIME AS DATE) >= :start_date_in
					AND CAST(A.START_DATE_TIME AS DATE) <= :end_date_in
					AND A.SITE = :site_in;

	  	/**FILTER RESRCE **/
 		var_tenth = APPLY_FILTER(:var_tenth, :resrce_in);
 	  	 /**FILTER MODEL **/
 	 	var_tenth = APPLY_FILTER(:var_tenth, :model_in);
  	 	/**FILTER ITEM **/
     	var_tenth = APPLY_FILTER(:var_tenth, :item_in);
 	 
 	    /**RESOURCE_TIME_LOG + PRODUCTION_OUTPUT_REALTIME : 找到时长对应的产量**/
 	  	var_eleventh =  SELECT
 	  					A.HANDLE, 
				    	A.SITE,
				  		A.RESRCE, 
				  		A.ASSET,
				  		A.DESCRIPTION, 
				  		A.WORK_AREA, 
				  		A.WORK_AREA_DES, 
				  		A.LINE_AREA, 
				  		A.LINE_AREA_DES,
				  		A.SHIFT, 
				  		A.SHIFT_HANDLE,
				  		A.START_TIME, 
				  		A.END_TIME, 
				  		A.SHIFT_DURATION, 
				  		A.SHIFT_DES, 
				  		A.START_DATE_TIME, 
				  		A.END_DATE_TIME, 
				  		A.ELAPSED_TIME,
				  		A.SHIFT_START_DATE_TIME,
				  		A.SHIFT_END_DATE_TIME,
				  		A.INTERSECTION_START_TIME,
				  		A.INTERSECTION_END_TIME,
				  		A.INTERSECTION_TIME_DURATION,
					   	B.ITEM,
					    SUM(B.QTY_TOTAL) AS QTY_TOTAL,
					   	B.MODEL,
					   	B.ITEM_DES
					   	FROM :var_eighth AS A
 	  				   	LEFT JOIN :var_tenth AS B
 	  				   	ON A.SITE= B.SITE
 	  				   	AND A.RESRCE = B.RESRCE
 	  				    AND B.START_DATE_TIME >= CAST(A.INTERSECTION_START_TIME AS SECONDDATE)
			 			AND B.END_DATE_TIME <= CAST(A.INTERSECTION_END_TIME AS SECONDDATE)
			 			group by 
			 			A.HANDLE, 
				    	A.SITE,
				  		A.RESRCE, 
				  		A.DESCRIPTION, 
				  		A.WORK_AREA, 
				  		A.WORK_AREA_DES, 
				  		A.LINE_AREA, 
				  		A.LINE_AREA_DES,
				  		A.SHIFT, 
				  		A.SHIFT_HANDLE,
				  		A.START_TIME, 
				  		A.END_TIME, 
				  		A.SHIFT_DURATION, 
				  		A.SHIFT_DES, 
				  		A.START_DATE_TIME, 
				  		A.END_DATE_TIME, 
				  		A.ELAPSED_TIME,
				  		A.SHIFT_START_DATE_TIME,
				  		A.SHIFT_END_DATE_TIME,
				  		A.INTERSECTION_START_TIME,
				  		A.INTERSECTION_END_TIME,
				  		A.INTERSECTION_TIME_DURATION,
					   	B.ITEM,
					   	B.MODEL,
					   	B.ITEM_DES,
					   	A.ASSET;
 	  	
 	  	/**计算PPM值 **/
 	  	var_cal_ppm = SELECT 
 	  					SITE,
				  		RESRCE, 
				  		ASSET,
				  		DESCRIPTION, 
				  		WORK_AREA, 
				  		WORK_AREA_DES, 
				  		LINE_AREA, 
				  		LINE_AREA_DES,
				  		SHIFT, 
				  		SHIFT_HANDLE,
				  		SHIFT_DURATION, 
				  		SHIFT_DES, 
				  		START_DATE_TIME, 
				  		END_DATE_TIME, 
				  		ELAPSED_TIME,
				  		SHIFT_START_DATE_TIME,
				  		SHIFT_END_DATE_TIME,
				  		INTERSECTION_START_TIME,
				  		INTERSECTION_END_TIME,
				  		INTERSECTION_TIME_DURATION,
					   	ITEM,
					   	QTY_TOTAL,
					   	MODEL,
					   	ITEM_DES,
					   	(QTY_TOTAL)/INTERSECTION_TIME_DURATION AS PPM,
					    row_number() over(PARTITION BY SHIFT_HANDLE || RESRCE || CAST(INTERSECTION_START_TIME AS DATE) || ITEM ORDER BY (QTY_TOTAL)/INTERSECTION_TIME_DURATION DESC) AS ORDER_QTY
 	  				  FROM :var_eleventh;
 	  	
 	  	 /**PPM 值 去掉两个最大值 取 第三大的**/			 
 	    var_twelfth = SELECT
						SITE,
				  		RESRCE, 
				  		ASSET,
				  		DESCRIPTION, 
				  		WORK_AREA, 
				  		WORK_AREA_DES, 
				  		LINE_AREA, 
				  		LINE_AREA_DES,
				  		SHIFT, 
				  		SHIFT_HANDLE,
				  		SHIFT_DURATION, 
				  		SHIFT_DES, 
				  		START_DATE_TIME, 
				  		END_DATE_TIME, 
				  		ELAPSED_TIME,
				  		SHIFT_START_DATE_TIME,
				  		SHIFT_END_DATE_TIME,
				  		INTERSECTION_START_TIME,
				  		INTERSECTION_END_TIME,
				  		INTERSECTION_TIME_DURATION,
					   	ITEM, 
					   	QTY_TOTAL ,
					   	MODEL,
					   	ITEM_DES,
					   	PPM
 	    			  FROM :var_cal_ppm
 	    			  WHERE ORDER_QTY = :activity_param_05_in + 1
 	    			  AND QTY_TOTAL > :activity_param_02_in
 	    			  AND PPM > :activity_param_03_in
 	    			  AND PPM < :activity_param_04_in;
 	    	
 	   	    			     
 	    /**得实际 PPM值
 	    var_thirteenth = SELECT 
						 SITE,
				  		 RESRCE,
				  		 ASSET, 
				  		 DESCRIPTION, 
				  		 WORK_AREA, 
				  		 WORK_AREA_DES, 
				  		 LINE_AREA, 
				  		 LINE_AREA_DES,
				  		 SHIFT, 
				  		 SHIFT_HANDLE,
				  		 SHIFT_DES,
					   	 ITEM,
					     MODEL,
					   	 ITEM_DES,
					   	 INTERSECTION_START_TIME,
					   	 MAX(PPM) AS PPM
 	    			     FROM :var_twelfth
 	    			     GROUP BY 
 	    			     SITE, 
 	    			     RESRCE, 
 	    			     DESCRIPTION, 
 	    			     WORK_AREA, 
 	    			     WORK_AREA_DES, 
 	    			     LINE_AREA, 
 	    			     LINE_AREA_DES, 
 	    			     SHIFT,
 	    			     SHIFT_HANDLE, 
 	    			     SHIFT_DES, 
 	    			     ITEM, MODEL, 
 	    			     ITEM_DES, 
 	    			     INTERSECTION_START_TIME, 
 	    			     ASSET;**/
 	    			     
 	 	/**得实际 PPM值**/
 	    var_fourteenth = SELECT 
 	    				 CASE WHEN :by_timetype='M' THEN CONCAT(CONCAT(YEAR(INTERSECTION_START_TIME),'-'),MONTH(INTERSECTION_START_TIME))
 		           		 WHEN :by_timetype='W' THEN ISOWEEK (INTERSECTION_START_TIME)
 		           		 WHEN :by_timetype='D' THEN TO_NVARCHAR(TO_DATE(INTERSECTION_START_TIME))
 		           		 ELSE TO_CHAR(TO_DATE(INTERSECTION_START_TIME)) || ' ' ||  SHIFT_DES END AS BY_TIME,
						 SITE,
				  		 RESRCE, 
				  		 ASSET,
				  		 DESCRIPTION, 
				  		 WORK_AREA, 
				  		 WORK_AREA_DES, 
				  		 LINE_AREA, 
				  		 LINE_AREA_DES,
				  		 CASE WHEN :by_timetype='M' OR :by_timetype='W' OR :by_timetype='D' THEN '' ELSE SHIFT END AS SHIFT,
				  		 CASE WHEN :by_timetype='M' OR :by_timetype='W' OR :by_timetype='D' THEN '' ELSE SHIFT_DES END AS SHIFT_DES,
				  		 CASE WHEN :by_timetype='M' OR :by_timetype='W' THEN 
				  		 YEAR(INTERSECTION_START_TIME) || '-' || MONTH(INTERSECTION_START_TIME) || '-01'
				  		 ELSE TO_CHAR(CAST(INTERSECTION_START_TIME AS DATE),'YYYY-MM-DD') END AS DAY_LOG,
					   	 ITEM,
					   	 MODEL,
					   	 ITEM_DES,
					   	 PPM
 	    			     FROM :var_twelfth;  			     
 	   
 	   	  /**按月 周  天 班次   分组**/
      var_fifteenth =    SELECT
     	  				 BY_TIME,
     	  				 SITE,
				  		 RESRCE, 
				  		 ASSET,
				  		 DESCRIPTION, 
				  		 WORK_AREA, 
				  		 WORK_AREA_DES, 
				  		 LINE_AREA, 
				  		 LINE_AREA_DES,
				  		 SHIFT, 
				  		 SHIFT_DES, 
					   	 ITEM,
					   	 MODEL,
					   	 ITEM_DES,
					   	 DAY_LOG,
					   	 SUM(PPM)/COUNT(BY_TIME) AS PPM
     			         FROM :var_fourteenth
     			         GROUP BY BY_TIME,SITE, RESRCE, DESCRIPTION, WORK_AREA, WORK_AREA_DES, DAY_LOG, LINE_AREA, LINE_AREA_DES, SHIFT, SHIFT_DES, ITEM, MODEL, ITEM_DES, ASSET;
	 
	 	/** STD_CYCLE_TIME 过滤 **/
	 	var_sixteenth = SELECT
	 					HANDLE, 
	 					SITE, 
	 					ITEM, 
	 					RESRCE, 
	 					PPM_THEORY, 
	 					CASE WHEN :by_timetype='M' OR :by_timetype='W' THEN 
				  		YEAR(START_DATE) || '-' || MONTH(START_DATE) || '-01'
				  		ELSE TO_CHAR(START_DATE, 'YYYY-MM-DD') END AS START_DATE,
				  		CASE WHEN :by_timetype='M' OR :by_timetype='W' THEN 
				  		YEAR(END_DATE) || '-' || MONTH(END_DATE) || '-02'
				  		ELSE TO_CHAR(END_DATE, 'YYYY-MM-DD') END AS END_DATE
	 					--START_DATE, 
	 					--END_DATE
						FROM MHP.STD_CYCLE_TIME  
						WHERE 
						--START_DATE <= :start_date_in
						--AND END_DATE >= :end_date_in
						--AND 
						SITE = :site_in;
					 
	 	/**FILTER RESRCE **/
 		var_sixteenth = APPLY_FILTER(:var_sixteenth, :resrce_in);
  	 	/**FILTER ITEM **/
     	var_sixteenth = APPLY_FILTER(:var_sixteenth, :item_in);				
	 
	  /** 关联  STD_CYCLE_TIME, 理论PPM **/
	  var_seventeenth =  SELECT 
	  					 BY_TIME,
				  		 WORK_AREA, 
				  		 WORK_AREA_DES, 
				  		 LINE_AREA, 
				  		 LINE_AREA_DES,
				  		 A.RESRCE, 
				  		 DESCRIPTION,
				  		 SHIFT, 
				  		 SHIFT_DES, 
					   	 A.ITEM,
					   	 MODEL,
					   	 ITEM_DES,
					   	 PPM,
					   	 ASSET,
					   	 DAY_LOG,
					   	 --COUNT(PPM_THEORY) AS PPM_THEORY
						 SUM(PPM_THEORY)/COUNT(PPM_THEORY) AS PPM_THEORY
					   	 --CASE WHEN PPM_THEORY IS NOT null THEN (PPM/PPM_THEORY)*100 ELSE null END AS FIRST_CAL
	 					 FROM :var_fifteenth AS A
	 					 LEFT JOIN :var_sixteenth AS B
	 					 ON A.SITE = B.SITE 
	 					 AND A.RESRCE = B.RESRCE
	 					 AND A.ITEM = B.ITEM
	 					 AND A.DAY_LOG >= B.START_DATE
	 					 AND A.DAY_LOG < B.END_DATE
	 					 GROUP BY 
	 					 BY_TIME,
				  		 WORK_AREA, 
				  		 WORK_AREA_DES, 
				  		 LINE_AREA, 
				  		 LINE_AREA_DES,
				  		 A.RESRCE, 
				  		 DESCRIPTION,
				  		 SHIFT, 
				  		 SHIFT_DES, 
					   	 A.ITEM,
					   	 MODEL,
					   	 ITEM_DES,
					   	 PPM,
					   	 ASSET,
					   	 DAY_LOG;	
	 
	  /** 关联  STD_CYCLE_TIME, 达成率 **/
	  var_result =  SELECT 
	  					 BY_TIME,
				  		 WORK_AREA, 
				  		 WORK_AREA_DES, 
				  		 LINE_AREA, 
				  		 LINE_AREA_DES,
				  		 RESRCE, 
				  		 DESCRIPTION,
				  		 SHIFT, 
				  		 SHIFT_DES, 
					   	 ITEM,
					   	 MODEL,
					   	 ITEM_DES,
					   	 PPM,
					   	 PPM_THEORY,
					   	 ASSET,
					   	 DAY_LOG,
					   	 CASE WHEN PPM_THEORY IS NOT null THEN (PPM/PPM_THEORY)*100 ELSE null END AS FIRST_CAL
	 					 FROM :var_seventeenth;  

 	 --	var_out = SELECT RESRCE, 1 AS QTY FROM :var_eighth;

   
	 var_out =  SELECT
	 			RESRCE, 
				DESCRIPTION, 
				WORK_AREA, 
				WORK_AREA_DES, 
				LINE_AREA, 
				LINE_AREA_DES,
				SHIFT,
				SHIFT_DES,
				ITEM,
				ROUND(PPM,2) as PPM,
				1 AS QTY,
				BY_TIME,
				MODEL,
				ITEM_DES,
				PPM_THEORY,
				ROUND(FIRST_CAL,2) || '%' as FIRST_CAL,
				ASSET
	 		    FROM :var_result;
 	  
  /*** 		
var_out =  SELECT
	 			RESRCE, 
				DESCRIPTION, 
				WORK_AREA, 
				WORK_AREA_DES, 
				LINE_AREA, 
				LINE_AREA_DES,
				SHIFT,
				SHIFT_DES,
				ITEM,
				PPM,
				1 AS QTY,
				to_char(DAY_LOG) as BY_TIME,
				'' as MODEL,
				'' as ITEM_DES,
				1.0 as PPM_THEORY,
				'' as FIRST_CAL,
				'' as ASSET
				--SHIFT_START_DATE_TIME,
				--SHIFT_END_DATE_TIME,
				--INTERSECTION_START_TIME,
				--INTERSECTION_END_TIME
				--INTERSECTION_TIME_DURATION
	 		    FROM :var_fourteenth;
  	 **/ 	  	
	 
END /********* End Procedure Script ************/