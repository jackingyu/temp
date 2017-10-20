package com.fmg.conmon.appserver.netweaver;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.fmg.conmon.vo.AppServerUserDetailsVO;
import com.fmg.conmon.vo.NetWeaverUserAuthVO;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.sap.engine.services.security.authentication.umapping.UserMappingDuplicateUserException;
import com.sap.engine.services.security.authentication.umapping.UserMappingFailedException;
import com.sap.engine.services.security.authentication.umapping.UserMappingNoSuchUserException;
import com.sap.engine.services.security.authentication.umapping.UserMappingService;
import com.sap.engine.services.security.authentication.umapping.UserMappingServiceFactory;
import com.sap.security.api.IUser;
import com.sap.security.api.IUserAccount;
import com.sap.security.api.IUserFactory;
import com.sap.security.api.PrincipalIterator;
import com.sap.security.api.UMException;
import com.sap.security.api.UMFactory;


public class NetWeaverUserProvider {

    private static final NetWeaverLogger logger = new NetWeaverLogger(NetWeaverUserProvider.class);
    private static Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();


    public static AppServerUserDetailsVO readUserDetails(String user) {
        AppServerUserDetailsVO result = new AppServerUserDetailsVO();
        try {
            IUserFactory userFactory = UMFactory.getUserFactory();
            IUser nwUser = userFactory.getUserByLogonID(user);
            result.setFirstName(nwUser.getFirstName());
            result.setLastName(nwUser.getLastName());
            result.setTelephone(nwUser.getTelephone());
            result.setCellphone(nwUser.getCellPhone());
            result.setEmail(nwUser.getEmail());
            result.setDepartment(nwUser.getDepartment());
            // TODO: check with FS if using category "SAPME" or others?
            String[] value = nwUser.getAttribute("SAPME", "DEFAULT SITE");
            if (value == null) {
                logger.error("No 'DEFAULT SITE' found in SAP NetWeaver UM.");
            } else {
                if (value.length == 0) {
                    logger.error("No 'DEFAULT SITE' found in SAP NetWeaver UM.");
                } else if (value.length == 1) {
                    result.setDefaultSite(value[0]);
                } else {
                    logger.warn("Multiple 'DEFAULT SITE' found in SAP NetWeaver UM, now pick the first one.");
                    result.setDefaultSite(value[0]);
                }
            }
        } catch (UMException e) {
            logger.error(e.getMessage());
        }
        return result;
    }

    public static NetWeaverUserAuthVO getUserAuth(String user, String password) {
        UserMappingServiceFactory userMappingFactory = UserMappingServiceFactory.getInstance();
        UserMappingService userMappingService = userMappingFactory.getUserMappingService();
        IUserAccount userAccount = null;
        NetWeaverUserAuthVO ret = new NetWeaverUserAuthVO();
        try {
            userAccount = userMappingService.getUserByLogonId(user);
            IUser assignedUser = userAccount.getAssignedUser();
            boolean authenticated = userAccount.checkPassword(password);
            ret.setAuthenticated(authenticated);

            if (authenticated) {
                Iterator<?> roleIter = new PrincipalIterator(assignedUser.getRoles(false), 1);
                List<String> roleList = new ArrayList<String>();
                while (roleIter.hasNext()) {
                    String role = (String) roleIter.next();
                    roleList.add(role);
                }
                ret.setGrantedRoles(roleList);
            }
        } catch (UserMappingNoSuchUserException e) {
            logger.error(e.getMessage());
            ret.setErrorMessage(e.getMessage());
        } catch (UserMappingDuplicateUserException e) {
            logger.error(e.getMessage());
            ret.setErrorMessage(e.getMessage());
        } catch (UserMappingFailedException e) {
            logger.error(e.getMessage());
            ret.setErrorMessage(e.getMessage());
        } catch (UMException e) {
            logger.error(e.getMessage());
            ret.setErrorMessage(e.getMessage());
        }
        return ret;
    }



    public static boolean readUserDetailsBySearchUser(String user) {
        try {
            IUserFactory userFactory = UMFactory.getUserFactory();
            IUser nwUser = userFactory.getUserByLogonID(user);
            logger.debug("search nwUser:    " + gson.toJson(nwUser));
            if(nwUser != null) {
                return true;
            }
        } catch (UMException e) {
            logger.error(e.getMessage());
            return false;
        }
        return false;

    }

}
