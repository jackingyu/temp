package com.fmg.conmon.vo;

import com.google.gson.Gson;

public abstract class AbstractVO {

    private static Gson gson = new Gson();
    
    @Override
    public String toString() {
        return gson.toJson(this);
    }

}
