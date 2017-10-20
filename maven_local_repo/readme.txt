======== MAVEN LOCAL REPOSITORY ========

Make sure to run below maven command so as to install 3rd party JARs.

$ mvn install:install-file -Dfile=/Users/i076218/Documents/01project/12GHA/AndonUi5/maven_local_repo/tc-sec-ume-api-impl-7.3010.jar -DgroupId=com.sap -DartifactId=tc-sec-ume-api-impl -Dversion=7.3010 -Dpackaging=jar

$ mvn install:install-file -Dfile=/Users/i076218/Documents/01project/12GHA/AndonUi5/maven_local_repo/tc-je-security-impl-7.3010.jar -DgroupId=com.sap -DartifactId=tc-je-security-impl -Dversion=7.3010 -Dpackaging=jar

$ mvn install:install-file -Dfile=/Users/i076218/Documents/01project/12GHA/AndonUi5/maven_local_repo/ngdbc.jar -DgroupId=com.sap -DartifactId=hana-connector-java -Dversion=1.0 -Dpackaging=jar




== Official Reference ==
https://maven.apache.org/guides/mini/guide-3rd-party-jars-local.html
