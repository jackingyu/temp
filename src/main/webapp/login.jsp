
<%@ page contentType="text/html;charset=GBK"%>
<html>
<head>
<title>在Tomcat 中采用Form 验证方式实现的安全Web应用程序的登录页</title>
</head>
<bodybgcolorbodybgcolor="#ffffff">
<form method="post" name="Login" action="j_security_check">
	<table width="500" border="1" align="center">
		<tr>
			<td colspan="2"><div align="center">
					<strong>在Tomcat中采用</strong> <strong>基于表单的安全验证的登录表单</strong>
				</div></td>
		</tr>
		<tr>
			<td width="224">
				<div align="right">用户名称：</div>
			</td>
			<td width="260"><input type="text" name="j_username"></td>
		</tr>
		<tr>
			<td><div align="right">密码：</div></td>
			<td><input type="password" name="j_password"></td>
		</tr>
		<tr>
			<td><div align="right">
					<input type="submit" name="Submit" value="提交">
				</div></td>
			<td><input type="reset" name="Submit2" value="重置"></td>
		</tr>
	</table>
</form>
</body>
</html>
