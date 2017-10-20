 
 /********* Begin Procedure Script ************/ 
 BEGIN 
 	
    /**RESRCE**/
    var_resrce = SELECT
   				 SITE,
 				 RESRCE, 
				 DESCRIPTION AS RESRCE_DES,
				 WORK_AREA,
 				 LINE_AREA
 				 FROM MHP.RESRCE
 				 WHERE SITE = :site_in;
 				 
 	 /**FILTER RESRCE **/
 	 var_resrce = APPLY_FILTER(:var_resrce, :resrce_in);
 	 /**FILTER WORK_AREA **/
 	 var_resrce = APPLY_FILTER(:var_resrce, :work_center_in);	
 	 /**FILTER LINE_AREA **/
 	 var_resrce = APPLY_FILTER(:var_resrce, :line_in);				

 	 /**WORK_AREA**/
 	 var_work_area = SELECT
 	 				 SITE,
 	 				 WORK_CENTER,
 	 				 DESCRIPTION
 	 				 FROM MHP.WORK_CENTER
 	 				 WHERE WC_CATEGORY='ZLEVEL6';
 	
 	 				 
 	  /**LINE_AREA**/
 	 var_line_area = SELECT
 	 				 SITE,
 	 				 WORK_CENTER,
 	 				 DESCRIPTION
 	 				 FROM MHP.WORK_CENTER
 	 				 WHERE WC_CATEGORY='LEVEL1'
 	 				 OR WC_CATEGORY='LEVEL3';

 	 /**RESRCE, WORK_AREA, LINE_AREA **/
 	 var_resrce_workcenter = SELECT 
 	 						 A.SITE,
 				 			 A.RESRCE, 
				  			 A.RESRCE_DES,
				 			 A.WORK_AREA,
 				 			 A.LINE_AREA,
 				 			 B.DESCRIPTION AS WORK_AREA_DES,
							 C.DESCRIPTION AS LINE_AREA_DES
 				 			 FROM :var_resrce AS A
 				 			 LEFT JOIN :var_work_area AS B
							 ON A.WORK_AREA = B.WORK_CENTER AND A.SITE = B.SITE
							 LEFT JOIN :var_line_area AS C
							 ON A.LINE_AREA = C.WORK_CENTER AND A.SITE = C.SITE;
							 
	/** PRODUCTION_OUTPUT_FIRST **/
	var_production_output_first = SELECT 
								  D.SITE,
								  D.SHIFT,
								  D.SHIFT_DESCRIPTION,
								  D.HANDLE,
								  D.QTY_YIELD,
								  D.QTY_SCRAP,
								  D.QTY_UNCONFIRM,
  								  D.START_DATE_TIME,
  								  D.END_DATE_TIME,
  								  D.ITEM,
  								  D.RESRCE
  								  FROM MHP.PRODUCTION_OUTPUT_FIRST AS D
  								  WHERE CAST(D.START_DATE_TIME AS DATE) >= CAST(:start_date_in AS DATE)
								  AND CAST(D.START_DATE_TIME AS DATE) <=  CAST(:end_date_in AS DATE)
								  AND SITE = :site_in;
 	 
    /**FILTER ITEM **/
    var_production_output_first = APPLY_FILTER(:var_production_output_first, :item_in);

    
    /**PRODUCTION_OUTPUT_FIRST RESRCE, WORK_AREA, LINE_AREA**/
    var_first = SELECT
				A.RESRCE, 
				A.RESRCE_DES,
				A.WORK_AREA,
				A.WORK_AREA_DES,
				A.LINE_AREA,
				A.LINE_AREA_DES,
				D.SITE,
				D.SHIFT,
				CASE WHEN D.SHIFT_DESCRIPTION IS NULL THEN D.SHIFT ELSE D.SHIFT_DESCRIPTION END AS SHIFT_DESCRIPTION,
				D.HANDLE,
				D.QTY_YIELD,
				D.QTY_SCRAP,
				D.QTY_UNCONFIRM,
  				D.START_DATE_TIME,
  				D.END_DATE_TIME,
  				D.ITEM
				FROM :var_production_output_first AS D
				INNER JOIN :var_resrce_workcenter AS A
				ON D.RESRCE = A.RESRCE AND D.SITE = A.SITE;
				
	/**ITEM**/
	var_item = SELECT
			   ITEM, 
			   DESCRIPTION, 
			   MODEL,
			   SITE
			   FROM MHP.ITEM
			   WHERE SITE = :site_in;
			   
	 /**FILTER MODEL **/
 	 var_item = APPLY_FILTER(:var_item, :model_in);

     
     /**PRODUCTION_OUTPUT_FIRST ITEM**/
 	 var_second = SELECT
 	 			   CASE WHEN :by_timetype='M' THEN CONCAT(CONCAT(YEAR(A.START_DATE_TIME),'-'),MONTH(A.START_DATE_TIME))
 		           WHEN :by_timetype='W' THEN ISOWEEK (A.START_DATE_TIME)
 		           WHEN :by_timetype='D' THEN TO_NVARCHAR(TO_DATE(A.START_DATE_TIME))
 		           ELSE TO_CHAR(TO_DATE(A.START_DATE_TIME)) || ' ' || A.SHIFT_DESCRIPTION END AS BY_TIME,
 	 			   A.SITE,
				   A.RESRCE, 
				   A.RESRCE_DES,
				   A.WORK_AREA,
				   A.WORK_AREA_DES,
				   A.LINE_AREA,
				   A.LINE_AREA_DES,
				   A.SHIFT,
				   A.SHIFT_DESCRIPTION,
				   A.HANDLE,
				   A.QTY_YIELD,
				   A.QTY_SCRAP,
				   A.QTY_UNCONFIRM,
  				   A.START_DATE_TIME,
  				   A.END_DATE_TIME,
 	 			   C.ITEM, 
				   C.DESCRIPTION AS ITEM_DES, 
				   C.MODEL
 	 			   FROM :var_first AS A
				   INNER JOIN :var_item AS C
				   ON A.ITEM = C.ITEM AND A.SITE = C.SITE;
 

 	 var_out =  SELECT
 	 		    WORK_AREA,
		        WORK_AREA_DES,
		        LINE_AREA,
		        LINE_AREA_DES,
		        RESRCE,
		        RESRCE_DES,
		        MODEL,
				ITEM, 
				ITEM_DES,
				BY_TIME,
				QTY_YIELD,
				QTY_SCRAP,
				SHIFT
				FROM :var_second;

END /********* End Procedure Script ************/