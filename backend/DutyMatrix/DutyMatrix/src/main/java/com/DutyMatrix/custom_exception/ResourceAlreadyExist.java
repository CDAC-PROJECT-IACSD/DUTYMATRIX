package com.DutyMatrix.custom_exception;

@SuppressWarnings("serial")
public class ResourceAlreadyExist extends RuntimeException {

	public ResourceAlreadyExist (String msg){
		super(msg);
	}
}
