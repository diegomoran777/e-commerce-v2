package com.diego.spring.backend.model;

import com.mercadopago.resources.Card;
import com.mercadopago.resources.datastructures.payment.Order;

public class ResponseIPN {

	private long id;
	private String date_created;
	private String date_approved;
	private String date_last_updated;
	private String date_of_expiration;
	private String money_release_date;
	private String operation_type;
	private String issuer_id;
	private String payment_method_id;
	private String payment_type_id;
	private String status;
	private String status_detail;
	private String currency_id;
	private String description;
	private boolean live_mode;
	private String sponsor_id;
	private String authorization_cod;
	private String money_release_schema;
	private String counter_currency;
	private String collector_id;
	private AdditionalInfo additional_info;
	private Card card;
	private long installments;
	private Order order;
	private float transaction_amount;
	private float total_paid_amount;
	private String payment_method_reference_id;
	private float shipping_amount;
	
	
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getDate_created() {
		return date_created;
	}
	public void setDate_created(String date_created) {
		this.date_created = date_created;
	}
	public String getDate_approved() {
		return date_approved;
	}
	public void setDate_approved(String date_approved) {
		this.date_approved = date_approved;
	}
	public String getDate_last_updated() {
		return date_last_updated;
	}
	public void setDate_last_updated(String date_last_updated) {
		this.date_last_updated = date_last_updated;
	}
	public String getDate_of_expiration() {
		return date_of_expiration;
	}
	public void setDate_of_expiration(String date_of_expiration) {
		this.date_of_expiration = date_of_expiration;
	}
	public String getMoney_release_date() {
		return money_release_date;
	}
	public void setMoney_release_date(String money_release_date) {
		this.money_release_date = money_release_date;
	}
	public String getOperation_type() {
		return operation_type;
	}
	public void setOperation_type(String operation_type) {
		this.operation_type = operation_type;
	}
	public String getIssuer_id() {
		return issuer_id;
	}
	public void setIssuer_id(String issuer_id) {
		this.issuer_id = issuer_id;
	}
	public String getPayment_method_id() {
		return payment_method_id;
	}
	public void setPayment_method_id(String payment_method_id) {
		this.payment_method_id = payment_method_id;
	}
	public String getPayment_type_id() {
		return payment_type_id;
	}
	public void setPayment_type_id(String payment_type_id) {
		this.payment_type_id = payment_type_id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getStatus_detail() {
		return status_detail;
	}
	public void setStatus_detail(String status_detail) {
		this.status_detail = status_detail;
	}
	public String getCurrency_id() {
		return currency_id;
	}
	public void setCurrency_id(String currency_id) {
		this.currency_id = currency_id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public boolean isLive_mode() {
		return live_mode;
	}
	public void setLive_mode(boolean live_mode) {
		this.live_mode = live_mode;
	}
	public String getSponsor_id() {
		return sponsor_id;
	}
	public void setSponsor_id(String sponsor_id) {
		this.sponsor_id = sponsor_id;
	}
	public String getAuthorization_cod() {
		return authorization_cod;
	}
	public void setAuthorization_cod(String authorization_cod) {
		this.authorization_cod = authorization_cod;
	}
	public String getMoney_release_schema() {
		return money_release_schema;
	}
	public void setMoney_release_schema(String money_release_schema) {
		this.money_release_schema = money_release_schema;
	}
	public String getCounter_currency() {
		return counter_currency;
	}
	public void setCounter_currency(String counter_currency) {
		this.counter_currency = counter_currency;
	}
	public String getCollector_id() {
		return collector_id;
	}
	public void setCollector_id(String collector_id) {
		this.collector_id = collector_id;
	}
	public AdditionalInfo getAdditional_info() {
		return additional_info;
	}
	public void setAdditional_info(AdditionalInfo additional_info) {
		this.additional_info = additional_info;
	}
	public Card getCard() {
		return card;
	}
	public void setCard(Card card) {
		this.card = card;
	}
	public long getInstallments() {
		return installments;
	}
	public void setInstallments(long installments) {
		this.installments = installments;
	}
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
	public float getTransaction_amount() {
		return transaction_amount;
	}
	public void setTransaction_amount(float transaction_amount) {
		this.transaction_amount = transaction_amount;
	}
	public float getTotal_paid_amount() {
		return total_paid_amount;
	}
	public void setTotal_paid_amount(float total_paid_amount) {
		this.total_paid_amount = total_paid_amount;
	}
	public String getPayment_method_reference_id() {
		return payment_method_reference_id;
	}
	public void setPayment_method_reference_id(String payment_method_reference_id) {
		this.payment_method_reference_id = payment_method_reference_id;
	}
	public float getShipping_amount() {
		return shipping_amount;
	}
	public void setShipping_amount(float shipping_amount) {
		this.shipping_amount = shipping_amount;
	}
	
	
	
}
