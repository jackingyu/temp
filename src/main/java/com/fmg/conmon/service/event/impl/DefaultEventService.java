package com.fmg.conmon.service.event.impl;

import java.util.List;

import javax.annotation.Resource;

import com.fmg.conmon.dao.impl.EventModelMapper;
import com.fmg.conmon.model.EventModel;
import com.fmg.conmon.model.EventModelExample;
import com.fmg.conmon.service.event.EventService;

public class DefaultEventService implements EventService{
	
	@Resource(name="eventModelMapper")
	private EventModelMapper eventModelMapper;

	@Override
	public List<EventModel> findEvents(int startIndex, int pageSize) {
		EventModelExample example = new EventModelExample();
		example.setDistinct(true);
		example.setLimit(pageSize);
		example.setOffset(startIndex);
		return eventModelMapper.selectByExample(example);
	}

	@Override
	public void createEvent(EventModel eventModel) {
		eventModelMapper.insert(eventModel);
	}
	
}
