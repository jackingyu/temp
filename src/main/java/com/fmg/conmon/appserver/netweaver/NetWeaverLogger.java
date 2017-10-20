package com.fmg.conmon.appserver.netweaver;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Marker;

public class NetWeaverLogger implements Logger {

    private static final String SAP_LOGGER_CLASS = "com.sap.tc.logging.Location";

    private static Logger genericLogger = LoggerFactory.getLogger(NetWeaverLogger.class);

    private String subLocation;
    private Object netWeaverNativeLogger;

    private static Method factoryMethod;

    private static Method debugMethod;
    private static Method debugExceptionMethod;
    private static Method infoMethod;
    private static Method infoExceptionMethod;
    private static Method warningMethod;
    private static Method warningExceptionMethod;
    private static Method errorMethod;
    private static Method errorExceptionMethod;
    // private static Method criticalMethod;
    // private static Method criticalExceptionMethod;

    static {
        try {
            Class<?> clazz = Class.forName(SAP_LOGGER_CLASS);

            factoryMethod = clazz.getMethod("getLocation", new Class<?>[] { String.class });
            Method traceExceptionMethod = getTraceExceptionMethod(clazz, "traceThrowableT");

            debugMethod = getTraceMethod(clazz, "debugT");
            debugExceptionMethod = traceExceptionMethod;

            infoMethod = getTraceMethod(clazz, "infoT");
            infoExceptionMethod = traceExceptionMethod;

            warningMethod = getTraceMethod(clazz, "warningT");
            warningExceptionMethod = traceExceptionMethod;

            errorMethod = getTraceMethod(clazz, "errorT");
            errorExceptionMethod = traceExceptionMethod;

            // criticalMethod = getTraceMethod(clazz, "fatalT");
            // criticalExceptionMethod = traceExceptionMethod;
        } catch (Exception e) {
            // TODO:
            // e.printStackTrace();
        }
    }

    public NetWeaverLogger(Class<?> clazz) {
        this(clazz, clazz.getName());
    }

    public NetWeaverLogger(Class<?> clazz, String location) {
        this.subLocation = clazz.getName();

        try {
            netWeaverNativeLogger = factoryMethod.invoke(null, new Object[] { location });
        } catch (IllegalAccessException e) {
            Logger logger = LoggerFactory.getLogger(clazz);
            logger.error(e.getMessage());
            netWeaverNativeLogger = logger;
        } catch (IllegalArgumentException e) {
            Logger logger = LoggerFactory.getLogger(clazz);
            logger.error(e.getMessage());
            netWeaverNativeLogger = logger;
        } catch (InvocationTargetException e) {
            Logger logger = LoggerFactory.getLogger(clazz);
            logger.error(e.getMessage());
            netWeaverNativeLogger = logger;
        }
    }

    @Override
    public String getName() {
        return this.getClass().getName();
    }

    @Override
    public boolean isTraceEnabled() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public void trace(String msg) {
        // TODO Auto-generated method stub

    }

    @Override
    public void trace(String format, Object arg) {
        // TODO Auto-generated method stub

    }

    @Override
    public void trace(String format, Object arg1, Object arg2) {
        // TODO Auto-generated method stub

    }

    @Override
    public void trace(String format, Object... arguments) {
        // TODO Auto-generated method stub

    }

    @Override
    public void trace(String msg, Throwable t) {
        // TODO Auto-generated method stub

    }

    @Override
    public boolean isTraceEnabled(Marker marker) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public void trace(Marker marker, String msg) {
        // TODO Auto-generated method stub

    }

    @Override
    public void trace(Marker marker, String format, Object arg) {
        // TODO Auto-generated method stub

    }

    @Override
    public void trace(Marker marker, String format, Object arg1, Object arg2) {
        // TODO Auto-generated method stub

    }

    @Override
    public void trace(Marker marker, String format, Object... argArray) {
        // TODO Auto-generated method stub

    }

    @Override
    public void trace(Marker marker, String msg, Throwable t) {
        // TODO Auto-generated method stub

    }

    @Override
    public boolean isDebugEnabled() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public void debug(String msg) {
        log(msg, debugMethod);
    }

    @Override
    public void debug(String format, Object arg) {
        // TODO Auto-generated method stub

    }

    @Override
    public void debug(String format, Object arg1, Object arg2) {
        // TODO Auto-generated method stub

    }

    @Override
    public void debug(String format, Object... arguments) {
        // TODO Auto-generated method stub

    }

    @Override
    public void debug(String msg, Throwable t) {
        logException(Severity.DEBUG, msg, t, debugExceptionMethod);
    }

    @Override
    public boolean isDebugEnabled(Marker marker) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public void debug(Marker marker, String msg) {
        log(msg, debugMethod);
    }

    @Override
    public void debug(Marker marker, String format, Object arg) {
        // TODO Auto-generated method stub

    }

    @Override
    public void debug(Marker marker, String format, Object arg1, Object arg2) {
        // TODO Auto-generated method stub

    }

    @Override
    public void debug(Marker marker, String format, Object... arguments) {
        // TODO Auto-generated method stub

    }

    @Override
    public void debug(Marker marker, String msg, Throwable t) {
        logException(Severity.DEBUG, msg, t, debugExceptionMethod);
    }

    @Override
    public boolean isInfoEnabled() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public void info(String msg) {
        log(msg, infoMethod);
    }

    @Override
    public void info(String format, Object arg) {
        // TODO Auto-generated method stub

    }

    @Override
    public void info(String format, Object arg1, Object arg2) {
        // TODO Auto-generated method stub

    }

    @Override
    public void info(String format, Object... arguments) {
        // TODO Auto-generated method stub

    }

    @Override
    public void info(String msg, Throwable t) {
        logException(Severity.INFO, msg, t, infoExceptionMethod);
    }

    @Override
    public boolean isInfoEnabled(Marker marker) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public void info(Marker marker, String msg) {
        // TODO Auto-generated method stub

    }

    @Override
    public void info(Marker marker, String format, Object arg) {
        // TODO Auto-generated method stub

    }

    @Override
    public void info(Marker marker, String format, Object arg1, Object arg2) {
        // TODO Auto-generated method stub

    }

    @Override
    public void info(Marker marker, String format, Object... arguments) {
        // TODO Auto-generated method stub

    }

    @Override
    public void info(Marker marker, String msg, Throwable t) {
        // TODO Auto-generated method stub

    }

    @Override
    public boolean isWarnEnabled() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public void warn(String msg) {
        log(msg, warningMethod);
    }

    @Override
    public void warn(String format, Object arg) {
        // TODO Auto-generated method stub

    }

    @Override
    public void warn(String format, Object... arguments) {
        // TODO Auto-generated method stub

    }

    @Override
    public void warn(String format, Object arg1, Object arg2) {
        // TODO Auto-generated method stub

    }

    @Override
    public void warn(String msg, Throwable t) {
        logException(Severity.WARNING, msg, t, warningExceptionMethod);
    }

    @Override
    public boolean isWarnEnabled(Marker marker) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public void warn(Marker marker, String msg) {
        // TODO Auto-generated method stub

    }

    @Override
    public void warn(Marker marker, String format, Object arg) {
        // TODO Auto-generated method stub

    }

    @Override
    public void warn(Marker marker, String format, Object arg1, Object arg2) {
        // TODO Auto-generated method stub

    }

    @Override
    public void warn(Marker marker, String format, Object... arguments) {
        // TODO Auto-generated method stub

    }

    @Override
    public void warn(Marker marker, String msg, Throwable t) {
        // TODO Auto-generated method stub

    }

    @Override
    public boolean isErrorEnabled() {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public void error(String msg) {
        log(msg, errorMethod);
    }

    @Override
    public void error(String format, Object arg) {
        // TODO Auto-generated method stub

    }

    @Override
    public void error(String format, Object arg1, Object arg2) {
        // TODO Auto-generated method stub

    }

    @Override
    public void error(String format, Object... arguments) {
        // TODO Auto-generated method stub

    }

    @Override
    public void error(String msg, Throwable t) {
        logException(Severity.ERROR, msg, t, errorExceptionMethod);
    }

    @Override
    public boolean isErrorEnabled(Marker marker) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public void error(Marker marker, String msg) {
        // TODO Auto-generated method stub

    }

    @Override
    public void error(Marker marker, String format, Object arg) {
        // TODO Auto-generated method stub

    }

    @Override
    public void error(Marker marker, String format, Object arg1, Object arg2) {
        // TODO Auto-generated method stub

    }

    @Override
    public void error(Marker marker, String format, Object... arguments) {
        // TODO Auto-generated method stub

    }

    @Override
    public void error(Marker marker, String msg, Throwable t) {
        // TODO Auto-generated method stub

    }

    private static Method getTraceMethod(Class<?> clazz, String methodName) throws NoSuchMethodException {
        return clazz.getMethod(methodName, new Class[] { String.class, String.class });
    }

    private static Method getTraceExceptionMethod(Class<?> clazz, String methodName) throws NoSuchMethodException {
        return clazz.getMethod(methodName, new Class[] { Integer.TYPE, String.class, String.class, Throwable.class });
    }

    protected void log(String message, Method logMethod) {
        if (logMethod != null) {
            try {
                logMethod.invoke(netWeaverNativeLogger, new Object[] { subLocation, message });
                // Pending Architecture decision. Exception swallow.
            } catch (IllegalArgumentException e) {
                 genericLogger.error(e.getMessage(), e);
            } catch (IllegalAccessException e) {
                 genericLogger.error(e.getMessage(), e);
            } catch (InvocationTargetException e) {
                 genericLogger.error(e.getMessage(), e);
            }
        }
    }

    protected void logException(int severity, String message, Throwable t, Method logExceptionMethod) {
        if (logExceptionMethod != null) {
            try {
                logExceptionMethod.invoke(netWeaverNativeLogger,
                        new Object[] { new Integer(severity), subLocation, message, t });
                // Pending Architecture decision. Exception swallow.
            } catch (IllegalArgumentException e) {
                 genericLogger.error(e.getMessage(), e);
            } catch (IllegalAccessException e) {
                 genericLogger.error(e.getMessage(), e);
            } catch (InvocationTargetException e) {
                 genericLogger.error(e.getMessage(), e);
            }
        }
    }

    /**
     * This enum is a copy of the SAP com.sap.tc.logging.Severity.class.
     */
    static class Severity {
        public static final int ALL = 0;
        public static final int DEBUG = 100;
        public static final int PATH = 200;
        public static final int INFO = 300;
        public static final int WARNING = 400;
        public static final int ERROR = 500;
        public static final int FATAL = 600;
        public static final int MIN = 0;
        public static final int MAX = 700;
        public static final int GROUP = 800;
        public static final int NONE = 701;
    }

}
