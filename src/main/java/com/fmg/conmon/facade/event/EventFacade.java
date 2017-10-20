package com.fmg.conmon.facade.event;

import java.util.List;

import com.fmg.conmon.dto.EventData;

public interface EventFacade {
	List<EventData> getEvents(final Integer startIndex,final Integer pageSize);
}
