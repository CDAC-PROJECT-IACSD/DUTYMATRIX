package com.DutyMatrix.custom_exception;

@SuppressWarnings("serial")
public class ResourseAlreadyExist extends RuntimeException {

	public ResourseAlreadyExist (String msg){
		super(msg);
	}
}
