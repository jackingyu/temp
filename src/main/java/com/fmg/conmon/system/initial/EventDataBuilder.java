package com.fmg.conmon.system.initial;


import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;

import com.fmg.conmon.model.EventModel;
import com.fmg.conmon.service.event.EventService;


public class EventDataBuilder implements DataBuilder {
	@Resource(name="eventService")
    private EventService eventService;
	private String fileName;
	
	@Override
	public void buildData() {
		List<String[]> results = ExcelFileReader.readSampleFile(fileName, 8);	
		for(String[] item:results)
		{
			EventModel eventModel = new EventModel();
			if(StringUtils.isEmpty(item[0]))
				return;
			
			eventModel.setArea(item[1]+item[0]);
			eventModel.setComponentname(item[2]+item[0]);
			eventModel.setComponenttype(item[3]+item[0]);
			eventModel.setEquipid(item[4]+item[0]);
			eventModel.setSeverity(item[5]+item[0]);
			eventModel.setStatus(Integer.valueOf(item[6]));
			eventService.createEvent(eventModel);
		}
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
}
