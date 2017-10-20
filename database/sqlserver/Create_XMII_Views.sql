/**
 * Target DBMS : MS SQL Server 2012
 */

/*
**************************
***** IMPORTANT NOTE *****
**************************

Prerequisite is CONMON and NW_DB are on the same server.
Modify this script according to the SQL Server environment and run it while logged to the CONMON database. 

Modification fields:
- NW_DB_NAME: NetWeaver database name such as MF1
- NW_DB_USER: NetWeaver database user with the rule 'SAP'+[NW_DB_NAME]+'DB', such as SAPMF1DB
*/


CREATE VIEW XMII_TAGGROUP AS SELECT * FROM NW_DB_NAME.NW_DB_USER.XMII_TAGGROUP
GO
CREATE VIEW XMII_TAGGROUP_ACT AS SELECT * FROM NW_DB_NAME.NW_DB_USER.XMII_TAGGROUP_ACT
GO
CREATE VIEW XMII_TAGGROUP_ST AS SELECT * FROM NW_DB_NAME.NW_DB_USER.XMII_TAGGROUP_ST
GO
