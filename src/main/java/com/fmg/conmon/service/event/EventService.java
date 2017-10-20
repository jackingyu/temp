package com.fmg.conmon.service.event;

import java.util.List;

import com.fmg.conmon.model.EventModel;

public interface EventService {
	
	/**find events with paging
	 * @param startIndex
	 *               start Index of requested resource
	 * @param pageSize
	 *               the length of the data record want to fetch
	 * @return
	 */
	List<EventModel> findEvents(int startIndex,int pageSize);
	
	/**
	 * create Events
	 * @param eventModel
	 *              event that need to create
	 */
	void createEvent(EventModel eventModel);

}
