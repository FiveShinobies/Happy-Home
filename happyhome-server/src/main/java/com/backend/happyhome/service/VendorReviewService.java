package com.backend.happyhome.service;

import com.backend.happyhome.dtos.VendorFeedbackRequestDTOE;

public interface VendorReviewService {
	void giveFeedback(VendorFeedbackRequestDTOE dto);
}
