package com.fmg.conmon.model;

import java.util.ArrayList;
import java.util.List;

public class EventModelExample {
    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table EVENT
     *
     * @mbggenerated
     */
    protected String orderByClause;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table EVENT
     *
     * @mbggenerated
     */
    protected boolean distinct;

    /**
     * This field was generated by MyBatis Generator.
     * This field corresponds to the database table EVENT
     *
     * @mbggenerated
     */
    protected List<Criteria> oredCriteria;

    private Integer limit;

    private Integer offset;

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table EVENT
     *
     * @mbggenerated
     */
    public EventModelExample() {
        oredCriteria = new ArrayList<Criteria>();
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table EVENT
     *
     * @mbggenerated
     */
    public void setOrderByClause(String orderByClause) {
        this.orderByClause = orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table EVENT
     *
     * @mbggenerated
     */
    public String getOrderByClause() {
        return orderByClause;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table EVENT
     *
     * @mbggenerated
     */
    public void setDistinct(boolean distinct) {
        this.distinct = distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table EVENT
     *
     * @mbggenerated
     */
    public boolean isDistinct() {
        return distinct;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table EVENT
     *
     * @mbggenerated
     */
    public List<Criteria> getOredCriteria() {
        return oredCriteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table EVENT
     *
     * @mbggenerated
     */
    public void or(Criteria criteria) {
        oredCriteria.add(criteria);
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table EVENT
     *
     * @mbggenerated
     */
    public Criteria or() {
        Criteria criteria = createCriteriaInternal();
        oredCriteria.add(criteria);
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table EVENT
     *
     * @mbggenerated
     */
    public Criteria createCriteria() {
        Criteria criteria = createCriteriaInternal();
        if (oredCriteria.size() == 0) {
            oredCriteria.add(criteria);
        }
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table EVENT
     *
     * @mbggenerated
     */
    protected Criteria createCriteriaInternal() {
        Criteria criteria = new Criteria();
        return criteria;
    }

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table EVENT
     *
     * @mbggenerated
     */
    public void clear() {
        oredCriteria.clear();
        orderByClause = null;
        distinct = false;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public Integer getOffset() {
        return offset;
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table EVENT
     *
     * @mbggenerated
     */
    protected abstract static class GeneratedCriteria {
        protected List<Criterion> criteria;

        protected GeneratedCriteria() {
            super();
            criteria = new ArrayList<Criterion>();
        }

        public boolean isValid() {
            return criteria.size() > 0;
        }

        public List<Criterion> getAllCriteria() {
            return criteria;
        }

        public List<Criterion> getCriteria() {
            return criteria;
        }

        protected void addCriterion(String condition) {
            if (condition == null) {
                throw new RuntimeException("Value for condition cannot be null");
            }
            criteria.add(new Criterion(condition));
        }

        protected void addCriterion(String condition, Object value, String property) {
            if (value == null) {
                throw new RuntimeException("Value for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value));
        }

        protected void addCriterion(String condition, Object value1, Object value2, String property) {
            if (value1 == null || value2 == null) {
                throw new RuntimeException("Between values for " + property + " cannot be null");
            }
            criteria.add(new Criterion(condition, value1, value2));
        }

        public Criteria andIdIsNull() {
            addCriterion("ID is null");
            return (Criteria) this;
        }

        public Criteria andIdIsNotNull() {
            addCriterion("ID is not null");
            return (Criteria) this;
        }

        public Criteria andIdEqualTo(Integer value) {
            addCriterion("ID =", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotEqualTo(Integer value) {
            addCriterion("ID <>", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThan(Integer value) {
            addCriterion("ID >", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdGreaterThanOrEqualTo(Integer value) {
            addCriterion("ID >=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThan(Integer value) {
            addCriterion("ID <", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdLessThanOrEqualTo(Integer value) {
            addCriterion("ID <=", value, "id");
            return (Criteria) this;
        }

        public Criteria andIdIn(List<Integer> values) {
            addCriterion("ID in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotIn(List<Integer> values) {
            addCriterion("ID not in", values, "id");
            return (Criteria) this;
        }

        public Criteria andIdBetween(Integer value1, Integer value2) {
            addCriterion("ID between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andIdNotBetween(Integer value1, Integer value2) {
            addCriterion("ID not between", value1, value2, "id");
            return (Criteria) this;
        }

        public Criteria andAreaIsNull() {
            addCriterion("AREA is null");
            return (Criteria) this;
        }

        public Criteria andAreaIsNotNull() {
            addCriterion("AREA is not null");
            return (Criteria) this;
        }

        public Criteria andAreaEqualTo(String value) {
            addCriterion("AREA =", value, "area");
            return (Criteria) this;
        }

        public Criteria andAreaNotEqualTo(String value) {
            addCriterion("AREA <>", value, "area");
            return (Criteria) this;
        }

        public Criteria andAreaGreaterThan(String value) {
            addCriterion("AREA >", value, "area");
            return (Criteria) this;
        }

        public Criteria andAreaGreaterThanOrEqualTo(String value) {
            addCriterion("AREA >=", value, "area");
            return (Criteria) this;
        }

        public Criteria andAreaLessThan(String value) {
            addCriterion("AREA <", value, "area");
            return (Criteria) this;
        }

        public Criteria andAreaLessThanOrEqualTo(String value) {
            addCriterion("AREA <=", value, "area");
            return (Criteria) this;
        }

        public Criteria andAreaLike(String value) {
            addCriterion("AREA like", value, "area");
            return (Criteria) this;
        }

        public Criteria andAreaNotLike(String value) {
            addCriterion("AREA not like", value, "area");
            return (Criteria) this;
        }

        public Criteria andAreaIn(List<String> values) {
            addCriterion("AREA in", values, "area");
            return (Criteria) this;
        }

        public Criteria andAreaNotIn(List<String> values) {
            addCriterion("AREA not in", values, "area");
            return (Criteria) this;
        }

        public Criteria andAreaBetween(String value1, String value2) {
            addCriterion("AREA between", value1, value2, "area");
            return (Criteria) this;
        }

        public Criteria andAreaNotBetween(String value1, String value2) {
            addCriterion("AREA not between", value1, value2, "area");
            return (Criteria) this;
        }

        public Criteria andEquipidIsNull() {
            addCriterion("EQUIPID is null");
            return (Criteria) this;
        }

        public Criteria andEquipidIsNotNull() {
            addCriterion("EQUIPID is not null");
            return (Criteria) this;
        }

        public Criteria andEquipidEqualTo(String value) {
            addCriterion("EQUIPID =", value, "equipid");
            return (Criteria) this;
        }

        public Criteria andEquipidNotEqualTo(String value) {
            addCriterion("EQUIPID <>", value, "equipid");
            return (Criteria) this;
        }

        public Criteria andEquipidGreaterThan(String value) {
            addCriterion("EQUIPID >", value, "equipid");
            return (Criteria) this;
        }

        public Criteria andEquipidGreaterThanOrEqualTo(String value) {
            addCriterion("EQUIPID >=", value, "equipid");
            return (Criteria) this;
        }

        public Criteria andEquipidLessThan(String value) {
            addCriterion("EQUIPID <", value, "equipid");
            return (Criteria) this;
        }

        public Criteria andEquipidLessThanOrEqualTo(String value) {
            addCriterion("EQUIPID <=", value, "equipid");
            return (Criteria) this;
        }

        public Criteria andEquipidLike(String value) {
            addCriterion("EQUIPID like", value, "equipid");
            return (Criteria) this;
        }

        public Criteria andEquipidNotLike(String value) {
            addCriterion("EQUIPID not like", value, "equipid");
            return (Criteria) this;
        }

        public Criteria andEquipidIn(List<String> values) {
            addCriterion("EQUIPID in", values, "equipid");
            return (Criteria) this;
        }

        public Criteria andEquipidNotIn(List<String> values) {
            addCriterion("EQUIPID not in", values, "equipid");
            return (Criteria) this;
        }

        public Criteria andEquipidBetween(String value1, String value2) {
            addCriterion("EQUIPID between", value1, value2, "equipid");
            return (Criteria) this;
        }

        public Criteria andEquipidNotBetween(String value1, String value2) {
            addCriterion("EQUIPID not between", value1, value2, "equipid");
            return (Criteria) this;
        }

        public Criteria andComponentnameIsNull() {
            addCriterion("COMPONENTNAME is null");
            return (Criteria) this;
        }

        public Criteria andComponentnameIsNotNull() {
            addCriterion("COMPONENTNAME is not null");
            return (Criteria) this;
        }

        public Criteria andComponentnameEqualTo(String value) {
            addCriterion("COMPONENTNAME =", value, "componentname");
            return (Criteria) this;
        }

        public Criteria andComponentnameNotEqualTo(String value) {
            addCriterion("COMPONENTNAME <>", value, "componentname");
            return (Criteria) this;
        }

        public Criteria andComponentnameGreaterThan(String value) {
            addCriterion("COMPONENTNAME >", value, "componentname");
            return (Criteria) this;
        }

        public Criteria andComponentnameGreaterThanOrEqualTo(String value) {
            addCriterion("COMPONENTNAME >=", value, "componentname");
            return (Criteria) this;
        }

        public Criteria andComponentnameLessThan(String value) {
            addCriterion("COMPONENTNAME <", value, "componentname");
            return (Criteria) this;
        }

        public Criteria andComponentnameLessThanOrEqualTo(String value) {
            addCriterion("COMPONENTNAME <=", value, "componentname");
            return (Criteria) this;
        }

        public Criteria andComponentnameLike(String value) {
            addCriterion("COMPONENTNAME like", value, "componentname");
            return (Criteria) this;
        }

        public Criteria andComponentnameNotLike(String value) {
            addCriterion("COMPONENTNAME not like", value, "componentname");
            return (Criteria) this;
        }

        public Criteria andComponentnameIn(List<String> values) {
            addCriterion("COMPONENTNAME in", values, "componentname");
            return (Criteria) this;
        }

        public Criteria andComponentnameNotIn(List<String> values) {
            addCriterion("COMPONENTNAME not in", values, "componentname");
            return (Criteria) this;
        }

        public Criteria andComponentnameBetween(String value1, String value2) {
            addCriterion("COMPONENTNAME between", value1, value2, "componentname");
            return (Criteria) this;
        }

        public Criteria andComponentnameNotBetween(String value1, String value2) {
            addCriterion("COMPONENTNAME not between", value1, value2, "componentname");
            return (Criteria) this;
        }

        public Criteria andComponenttypeIsNull() {
            addCriterion("COMPONENTTYPE is null");
            return (Criteria) this;
        }

        public Criteria andComponenttypeIsNotNull() {
            addCriterion("COMPONENTTYPE is not null");
            return (Criteria) this;
        }

        public Criteria andComponenttypeEqualTo(String value) {
            addCriterion("COMPONENTTYPE =", value, "componenttype");
            return (Criteria) this;
        }

        public Criteria andComponenttypeNotEqualTo(String value) {
            addCriterion("COMPONENTTYPE <>", value, "componenttype");
            return (Criteria) this;
        }

        public Criteria andComponenttypeGreaterThan(String value) {
            addCriterion("COMPONENTTYPE >", value, "componenttype");
            return (Criteria) this;
        }

        public Criteria andComponenttypeGreaterThanOrEqualTo(String value) {
            addCriterion("COMPONENTTYPE >=", value, "componenttype");
            return (Criteria) this;
        }

        public Criteria andComponenttypeLessThan(String value) {
            addCriterion("COMPONENTTYPE <", value, "componenttype");
            return (Criteria) this;
        }

        public Criteria andComponenttypeLessThanOrEqualTo(String value) {
            addCriterion("COMPONENTTYPE <=", value, "componenttype");
            return (Criteria) this;
        }

        public Criteria andComponenttypeLike(String value) {
            addCriterion("COMPONENTTYPE like", value, "componenttype");
            return (Criteria) this;
        }

        public Criteria andComponenttypeNotLike(String value) {
            addCriterion("COMPONENTTYPE not like", value, "componenttype");
            return (Criteria) this;
        }

        public Criteria andComponenttypeIn(List<String> values) {
            addCriterion("COMPONENTTYPE in", values, "componenttype");
            return (Criteria) this;
        }

        public Criteria andComponenttypeNotIn(List<String> values) {
            addCriterion("COMPONENTTYPE not in", values, "componenttype");
            return (Criteria) this;
        }

        public Criteria andComponenttypeBetween(String value1, String value2) {
            addCriterion("COMPONENTTYPE between", value1, value2, "componenttype");
            return (Criteria) this;
        }

        public Criteria andComponenttypeNotBetween(String value1, String value2) {
            addCriterion("COMPONENTTYPE not between", value1, value2, "componenttype");
            return (Criteria) this;
        }

        public Criteria andConmontypeIsNull() {
            addCriterion("CONMONTYPE is null");
            return (Criteria) this;
        }

        public Criteria andConmontypeIsNotNull() {
            addCriterion("CONMONTYPE is not null");
            return (Criteria) this;
        }

        public Criteria andConmontypeEqualTo(String value) {
            addCriterion("CONMONTYPE =", value, "conmontype");
            return (Criteria) this;
        }

        public Criteria andConmontypeNotEqualTo(String value) {
            addCriterion("CONMONTYPE <>", value, "conmontype");
            return (Criteria) this;
        }

        public Criteria andConmontypeGreaterThan(String value) {
            addCriterion("CONMONTYPE >", value, "conmontype");
            return (Criteria) this;
        }

        public Criteria andConmontypeGreaterThanOrEqualTo(String value) {
            addCriterion("CONMONTYPE >=", value, "conmontype");
            return (Criteria) this;
        }

        public Criteria andConmontypeLessThan(String value) {
            addCriterion("CONMONTYPE <", value, "conmontype");
            return (Criteria) this;
        }

        public Criteria andConmontypeLessThanOrEqualTo(String value) {
            addCriterion("CONMONTYPE <=", value, "conmontype");
            return (Criteria) this;
        }

        public Criteria andConmontypeLike(String value) {
            addCriterion("CONMONTYPE like", value, "conmontype");
            return (Criteria) this;
        }

        public Criteria andConmontypeNotLike(String value) {
            addCriterion("CONMONTYPE not like", value, "conmontype");
            return (Criteria) this;
        }

        public Criteria andConmontypeIn(List<String> values) {
            addCriterion("CONMONTYPE in", values, "conmontype");
            return (Criteria) this;
        }

        public Criteria andConmontypeNotIn(List<String> values) {
            addCriterion("CONMONTYPE not in", values, "conmontype");
            return (Criteria) this;
        }

        public Criteria andConmontypeBetween(String value1, String value2) {
            addCriterion("CONMONTYPE between", value1, value2, "conmontype");
            return (Criteria) this;
        }

        public Criteria andConmontypeNotBetween(String value1, String value2) {
            addCriterion("CONMONTYPE not between", value1, value2, "conmontype");
            return (Criteria) this;
        }

        public Criteria andSeverityIsNull() {
            addCriterion("SEVERITY is null");
            return (Criteria) this;
        }

        public Criteria andSeverityIsNotNull() {
            addCriterion("SEVERITY is not null");
            return (Criteria) this;
        }

        public Criteria andSeverityEqualTo(String value) {
            addCriterion("SEVERITY =", value, "severity");
            return (Criteria) this;
        }

        public Criteria andSeverityNotEqualTo(String value) {
            addCriterion("SEVERITY <>", value, "severity");
            return (Criteria) this;
        }

        public Criteria andSeverityGreaterThan(String value) {
            addCriterion("SEVERITY >", value, "severity");
            return (Criteria) this;
        }

        public Criteria andSeverityGreaterThanOrEqualTo(String value) {
            addCriterion("SEVERITY >=", value, "severity");
            return (Criteria) this;
        }

        public Criteria andSeverityLessThan(String value) {
            addCriterion("SEVERITY <", value, "severity");
            return (Criteria) this;
        }

        public Criteria andSeverityLessThanOrEqualTo(String value) {
            addCriterion("SEVERITY <=", value, "severity");
            return (Criteria) this;
        }

        public Criteria andSeverityLike(String value) {
            addCriterion("SEVERITY like", value, "severity");
            return (Criteria) this;
        }

        public Criteria andSeverityNotLike(String value) {
            addCriterion("SEVERITY not like", value, "severity");
            return (Criteria) this;
        }

        public Criteria andSeverityIn(List<String> values) {
            addCriterion("SEVERITY in", values, "severity");
            return (Criteria) this;
        }

        public Criteria andSeverityNotIn(List<String> values) {
            addCriterion("SEVERITY not in", values, "severity");
            return (Criteria) this;
        }

        public Criteria andSeverityBetween(String value1, String value2) {
            addCriterion("SEVERITY between", value1, value2, "severity");
            return (Criteria) this;
        }

        public Criteria andSeverityNotBetween(String value1, String value2) {
            addCriterion("SEVERITY not between", value1, value2, "severity");
            return (Criteria) this;
        }

        public Criteria andStatusIsNull() {
            addCriterion("STATUS is null");
            return (Criteria) this;
        }

        public Criteria andStatusIsNotNull() {
            addCriterion("STATUS is not null");
            return (Criteria) this;
        }

        public Criteria andStatusEqualTo(Integer value) {
            addCriterion("STATUS =", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotEqualTo(Integer value) {
            addCriterion("STATUS <>", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThan(Integer value) {
            addCriterion("STATUS >", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusGreaterThanOrEqualTo(Integer value) {
            addCriterion("STATUS >=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThan(Integer value) {
            addCriterion("STATUS <", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusLessThanOrEqualTo(Integer value) {
            addCriterion("STATUS <=", value, "status");
            return (Criteria) this;
        }

        public Criteria andStatusIn(List<Integer> values) {
            addCriterion("STATUS in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotIn(List<Integer> values) {
            addCriterion("STATUS not in", values, "status");
            return (Criteria) this;
        }

        public Criteria andStatusBetween(Integer value1, Integer value2) {
            addCriterion("STATUS between", value1, value2, "status");
            return (Criteria) this;
        }

        public Criteria andStatusNotBetween(Integer value1, Integer value2) {
            addCriterion("STATUS not between", value1, value2, "status");
            return (Criteria) this;
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table EVENT
     *
     * @mbggenerated do_not_delete_during_merge
     */
    public static class Criteria extends GeneratedCriteria {

        protected Criteria() {
            super();
        }
    }

    /**
     * This class was generated by MyBatis Generator.
     * This class corresponds to the database table EVENT
     *
     * @mbggenerated
     */
    public static class Criterion {
        private String condition;

        private Object value;

        private Object secondValue;

        private boolean noValue;

        private boolean singleValue;

        private boolean betweenValue;

        private boolean listValue;

        private String typeHandler;

        public String getCondition() {
            return condition;
        }

        public Object getValue() {
            return value;
        }

        public Object getSecondValue() {
            return secondValue;
        }

        public boolean isNoValue() {
            return noValue;
        }

        public boolean isSingleValue() {
            return singleValue;
        }

        public boolean isBetweenValue() {
            return betweenValue;
        }

        public boolean isListValue() {
            return listValue;
        }

        public String getTypeHandler() {
            return typeHandler;
        }

        protected Criterion(String condition) {
            super();
            this.condition = condition;
            this.typeHandler = null;
            this.noValue = true;
        }

        protected Criterion(String condition, Object value, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.typeHandler = typeHandler;
            if (value instanceof List<?>) {
                this.listValue = true;
            } else {
                this.singleValue = true;
            }
        }

        protected Criterion(String condition, Object value) {
            this(condition, value, null);
        }

        protected Criterion(String condition, Object value, Object secondValue, String typeHandler) {
            super();
            this.condition = condition;
            this.value = value;
            this.secondValue = secondValue;
            this.typeHandler = typeHandler;
            this.betweenValue = true;
        }

        protected Criterion(String condition, Object value, Object secondValue) {
            this(condition, value, secondValue, null);
        }
    }
}