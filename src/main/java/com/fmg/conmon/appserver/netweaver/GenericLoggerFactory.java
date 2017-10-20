package com.fmg.conmon.appserver.netweaver;

import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class GenericLoggerFactory {

    private static ServletContext servletContext;

    public static Logger getLogger(Class<?> clazz) {
        Logger logger = null;
        if (servletContext != null) {
            String serverInfo = servletContext.getServerInfo();
            if (serverInfo.contains("NetWeaver")) {
                logger = new NetWeaverLogger(clazz);
            }
        }
        if (logger == null) {
            logger = LoggerFactory.getLogger(clazz);
        }
        return logger;
    }

    public static void setServletContext(ServletContext servletContext) {
        GenericLoggerFactory.servletContext = servletContext;
    }


}
