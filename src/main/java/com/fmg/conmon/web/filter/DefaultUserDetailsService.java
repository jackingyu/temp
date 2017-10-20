package com.fmg.conmon.web.filter;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;


public class DefaultUserDetailsService implements UserDetailsService {

	private final String rolePrefix = "ROLE_";

	public UserDetails loadUserByUsername(String username)
	{

		final org.springframework.security.core.userdetails.User userDetails = new org.springframework.security.core.userdetails.User(
				username, "", getAuthorities(username));

		return userDetails;
	}

	private Collection<GrantedAuthority> getAuthorities(final String username)
	{
		Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
	
		return authorities;
	}

}
