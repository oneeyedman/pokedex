/**
 * Incializamos el objeto PIKA
 */
PIKA.init = function() {
	PIKA.ajax.init();
}


// Si el DOM está listo, empezamos.
$(function() {
	PIKA.init();
});
