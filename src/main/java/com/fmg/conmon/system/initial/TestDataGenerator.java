package com.fmg.conmon.system.initial;

import java.util.List;

/**
 * test data generator,depends {@link DataBuilder}
 */
public class TestDataGenerator {
	private List<DataBuilder> dataBuilders;

	public void generateData()
	{
		for(DataBuilder db:dataBuilders)
		 db.buildData();
	}

	public void setDataBuilders(List<DataBuilder> dataBuilders)
	{
		this.dataBuilders = dataBuilders;
	}

}
