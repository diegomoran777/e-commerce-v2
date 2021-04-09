package com.diego.spring.backend.controller;


import java.util.Collections;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.env.Environment;

import com.diego.spring.backend.model.ResponseIPN;
import com.diego.spring.backend.model.UserProgram;
import com.diego.spring.backend.service.EmailService;
import com.diego.spring.backend.service.GeneralService;
import com.diego.spring.backend.service.MPService;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.Preference;

@RestController
@RequestMapping("/api/mp")
@CrossOrigin(origins = {"*"})
public class ControllerRestMP {

	@Autowired
	MPService serviceMP;
	
	@Autowired
	GeneralService service;
	
	@Autowired
	EmailService emailService;
	
	@Autowired
	Environment env;
	
	private final String SUBJECT = "Compra En MDAccesorios";
	
	@PostMapping(value="/go-mp", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Map<String,String> goMp(@RequestBody UserProgram user) throws MPException {
			Preference preference = new Preference();
			serviceMP.setBackUrls(preference);
			serviceMP.setPayer(preference, user.getUserName());
			serviceMP.addItems(preference, user.getUserName());
			return Collections.singletonMap("response", preference.save().getInitPoint());
	}
	
	
	@PostMapping("ipn-response")
	public ResponseEntity<?> responseIPN(@RequestParam("topic") String topic, @RequestParam("id") String id) {
		try {
			RestTemplate restTemplate = new RestTemplate();
			ResponseIPN responseIpn = restTemplate.getForObject("https://api.mercadopago.com/v1/payments/"
					.concat(id)
					.concat("?access_token=")
					.concat(env.getProperty("token.value")), ResponseIPN.class);
			
			if(serviceMP.isAproved(responseIpn.getStatus())) {
				String userEmail = responseIpn.getAdditional_info().getPayer().getLast_name();
				emailService.sendEmail(userEmail, SUBJECT, serviceMP.contentEmail(responseIpn));
				
				serviceMP.fillPurchase(responseIpn);
				serviceMP.fillSale(responseIpn);
				serviceMP.deleteCartList(responseIpn);
			}
			
		} catch (Exception e) {
			System.out.println("PEDIDO NO ENCONTRADO");
		}
		return ResponseEntity.status(HttpStatus.OK).build();
	}
}
