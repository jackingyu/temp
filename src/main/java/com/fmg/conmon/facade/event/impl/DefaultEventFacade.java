package com.fmg.conmon.facade.event.impl;

import java.util.ArrayList;
import java.util.List;

import com.fmg.conmon.dto.EventData;
import com.fmg.conmon.facade.event.EventFacade;
import com.fmg.conmon.model.EventModel;
import com.fmg.conmon.populator.EventPopulator;
import com.fmg.conmon.service.event.EventService;

public class DefaultEventFacade implements EventFacade {

	private EventService eventService;
	private EventPopulator eventPopulator;

	@Override
	public List<EventData> getEvents(Integer startIndex, Integer pageSize) {
		List<EventModel> eventModels = eventService.findEvents(startIndex, pageSize);
		List<EventData> events = new ArrayList<EventData>();
		for(EventModel eventModel:eventModels)
		{
			EventData event = new EventData();
			eventPopulator.populate(eventModel, event);
			events.add(event);
		}
		
		return events;
	}

	public void setEventService(EventService eventService) {
		this.eventService = eventService;
	}

	public void setEventPopulator(EventPopulator eventPopulator) {
		this.eventPopulator = eventPopulator;
	}
	
}
