
<%@ page contentType="text/html;charset=GBK"%>
<html>
<head>
<title>��Tomcat �в���Form ��֤��ʽʵ�ֵİ�ȫWebӦ�ó���ĵ�¼ҳ</title>
</head>
<bodybgcolorbodybgcolor="#ffffff">
<form method="post" name="Login" action="j_security_check">
	<table width="500" border="1" align="center">
		<tr>
			<td colspan="2"><div align="center">
					<strong>��Tomcat�в���</strong> <strong>���ڱ��İ�ȫ��֤�ĵ�¼��</strong>
				</div></td>
		</tr>
		<tr>
			<td width="224">
				<div align="right">�û����ƣ�</div>
			</td>
			<td width="260"><input type="text" name="j_username"></td>
		</tr>
		<tr>
			<td><div align="right">���룺</div></td>
			<td><input type="password" name="j_password"></td>
		</tr>
		<tr>
			<td><div align="right">
					<input type="submit" name="Submit" value="�ύ">
				</div></td>
			<td><input type="reset" name="Submit2" value="����"></td>
		</tr>
	</table>
</form>
</body>
</html>
