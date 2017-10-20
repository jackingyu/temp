package com.fmg.conmon.filter;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.StringTokenizer;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;

import com.fmg.conmon.appserver.netweaver.GenericLoggerFactory;
import com.fmg.conmon.appserver.netweaver.NetWeaverLogger;
import com.fmg.conmon.appserver.netweaver.NetWeaverUserProvider;
import com.fmg.conmon.vo.NetWeaverUserAuthVO;

public class HttpBasicAuthenticationFilter implements Filter {

    private static final String URI_CLIENT_USER_LOGIN = "/api/v1/client_user_login/";

    private static Logger logger;

    // dummy username and password for development and test
    private static String username = "integrator";
    private static String password = "dev";
    private String realm = "Protected";

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        String paramRealm = filterConfig.getInitParameter("realm");
        if (StringUtils.isNotBlank(paramRealm)) {
            realm = paramRealm;
        }

        ServletContext servletContext = filterConfig.getServletContext();
        GenericLoggerFactory.setServletContext(servletContext);
        logger = GenericLoggerFactory.getLogger(HttpBasicAuthenticationFilter.class);
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null) {
            StringTokenizer st = new StringTokenizer(authHeader);
            if (st.hasMoreTokens()) {
                String basic = st.nextToken();

                if (basic.equalsIgnoreCase("Basic")) {
                    try {
                        String credentials = new String(Base64.decodeBase64(st.nextToken()), "UTF-8");
                        int p = credentials.indexOf(":");
                        if (p != -1) {
                            String _username = credentials.substring(0, p).trim();
                            String _password = credentials.substring(p + 1).trim();

                            if (logger instanceof NetWeaverLogger) {
                                NetWeaverUserAuthVO authVO = NetWeaverUserProvider.getUserAuth(_username, _password);
                                if (!authVO.isAuthenticated()) {
                                    unauthorized(response, "Bad credentials");
                                }
                                if (!isAuthorizedNetWeaverUser(request, authVO.getGrantedRoles())) {
                                    unauthorized(response, "Unauthorized roles");
                                }
                            } else {
                                // other app servers
                                // TODO: re-write below logic by invoking app server API
                                if (!username.equals(_username) || !password.equals(_password)) {
                                    unauthorized(response, "Bad credentials");
                                }
                            }

                            filterChain.doFilter(servletRequest, servletResponse);
                        } else {
                            unauthorized(response, "Invalid authentication token");
                        }
                    } catch (UnsupportedEncodingException e) {
                        throw new Error("Failed to retrieve authentication", e);
                    }
                }
            }
        } else {
            unauthorized(response);
        }
    }

    @Override
    public void destroy() {
        // do nothing
    }

    private void unauthorized(HttpServletResponse response, String message) throws IOException {
        response.setHeader("WWW-Authenticate", "Basic realm=\"" + realm + "\"");
        response.sendError(401, message);
    }

    private void unauthorized(HttpServletResponse response) throws IOException {
        unauthorized(response, "Unauthorized");
    }

    private boolean isAuthorizedNetWeaverUser(HttpServletRequest request, List<String> roleList) {
        String contextPath = request.getContextPath();
        String requestUri = request.getRequestURI();

        /**
         * /api/v1/client_user_login/{user}" : MHP_USER
         *                      Other APIs   : MHP_INTEGRATOR
         */
        String targetRole = "ROLE.UME_ROLE_PERSISTENCE.un:MHP_INTEGRATOR";
        String uri = requestUri.substring(contextPath.length());
        if (uri.startsWith(URI_CLIENT_USER_LOGIN)) {
            targetRole = "ROLE.UME_ROLE_PERSISTENCE.un:MHP_USER";
        }
        for (String each : roleList) {
            if (targetRole.equals(each)) {
                return true;
            }
        }
        return false;
    }

}
