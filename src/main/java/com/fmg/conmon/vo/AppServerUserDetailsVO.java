package com.fmg.conmon.vo;

public class AppServerUserDetailsVO extends AbstractVO {

    private String firstName;
    private String lastName;
    private String telephone;
    private String cellphone;
    private String email;
    private String department;
    private String defaultSite;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDefaultSite() {
        return defaultSite;
    }

    public void setDefaultSite(String defaultSite) {
        this.defaultSite = defaultSite;
    }

    public static AppServerUserDetailsVO getDefaultVO() {
        AppServerUserDetailsVO result = new AppServerUserDetailsVO();
        result.setLastName("Jack");
        result.setFirstName("Yu");
        result.setTelephone("+86-21-80372706");
        result.setCellphone("+86-13801111000");
        result.setEmail("cheng.jiang@sap.com");
        result.setDepartment("SAP");
        result.setDefaultSite("1030");
        return result;
    }

}
