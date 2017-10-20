package com.fmg.conmon.web.ui5.controller;


import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fmg.conmon.dto.EventData;
import com.fmg.conmon.facade.event.EventFacade;
import com.fmg.conmon.system.initial.TestDataGenerator;

@RestController
public class EventController extends AbstractController{

	@Resource(name="eventFacade")
	EventFacade eventFacade;
	
	@Resource(name="testDataGenerator")
	TestDataGenerator testDataGenerator;

	@RequestMapping(value = PREFIX+"/event/getevents")
	@ResponseBody
	public List<EventData> getEvents(
			@RequestParam(name = "startIndex", required = true) final Integer startIndex,
			@RequestParam(name = "pageSize", required = true) final Integer pageSize,
			HttpServletResponse response) throws IOException
	{
		List<EventData> events = eventFacade.getEvents(startIndex, pageSize);
		return events;
	}
	
	@RequestMapping(value = PREFIX+"/init")
	public void initEvents(HttpServletResponse response) 
	{
		testDataGenerator.generateData();
	}

}
