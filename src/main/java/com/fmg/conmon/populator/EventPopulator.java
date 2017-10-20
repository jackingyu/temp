package com.fmg.conmon.populator;

import com.fmg.conmon.dto.EventData;
import com.fmg.conmon.model.EventModel;

public class EventPopulator implements Populator<EventModel, EventData> {

	@Override
	public void populate(EventModel source, EventData target) {
		target.setArea(source.getArea());
		target.setComponentName(source.getComponentname());
		target.setComponentType(source.getComponenttype());
		target.setConmonType(source.getConmontype());
		target.setEquipId(source.getEquipid());
		target.setSeverity(source.getSeverity());
		target.setStatus(source.getStatus());
		target.setId(source.getId());
	}

}
