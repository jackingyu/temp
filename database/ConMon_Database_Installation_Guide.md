# Database Installation Guide

## Microsoft SQL Server 2012

* SQL Server must use the `Latin1_General_CI_AS` collation for CONMON.
For SQL Server 2012, on the *Customize the SQL Server 2012 Database Engine Collation* screen, select the *Windows collation designator and sort order* checkbox, enter `Latin1_General` as *Collation designator*, and select the *Accent-sensitive* checkbox.

<br/>

* For CONMON database the isolation level is set to Snapshot.
  * Set the *Snapshot Isolation* option to On by executing the following statement: `alter database [<Database_name>] set ALLOW_SNAPSHOT_ISOLATION ON` where `<Database_name>` is the actual name of the database.
  * To verify the *Snapshot Isolation* state, execute the following query: `SELECT sd.snapshot_isolation_state, sd.snapshot_isolation_state_desc FROM sys.databases AS sd WHERE sd.[name] = '<Database_name>'`
  * *Snapshot Isolation* State Description:
  * *0*: Snapshot Isolation is Off (default).
    * *1*: Snapshot Isolation is On. Snapshot isolation is allowed.
    * *2*: Snapshot Isolation is in transition to Off. All transactions have modification versions. You cannot start new transactions using snapshot isolation. The database remains in transition to Off until all transactions are completed.
    * *3*: Snapshot Isolation is in transition to On. Transactions cannot use snapshot isolation until the state becomes 1. The database remains On until all transactions are completed.
  * Set the *Read Committed Snapshot* option to *On* by executing the following statement: `alter database [<Database_name>] SET READ_COMMITTED_SNAPSHOT ON`.
  * To verify the *Read Committed Snapshot* state, execute the following query: `SELECT sd.is_read_committed_snapshot_on FROM sys.databases AS sd WHERE sd.[name] = '<Database_name>'`
  * *Read Omitted Snapshot* Option State Description
    * *0*: Read-committed snapshot is Off (default). Read operations under the read-committed level use share locks.
    * *1*: Read-committed snapshot is On. Read operations under the read-committed level are based on snapshot scans and do not acquire locks.

<br/>

* Auto Updating/Creating Statistics for CONMON database
  * `alter database <Database_name> set auto_create_statistics on`
  * `alter database <Database_name> set auto_update_statistics on`
  * `alter database <Database_name> set auto_update_statistics_async on`

<br/>

* Database Users
  * CONMON User
    * Map the CONMON user to the CONMON database.
    * The CONMON database must be configured as the default database for the CONMON user.
  * Assign roles to the database users as follows:

    | User/Database | CONMON Database  |  NW_DB (MII) Database  |
    | ------------- |:----------------:|:----------------------:|
    | CONMON        | db_owner         | db_datareader          |
    | NW_DB (MII)   |                  | db_owner               |
