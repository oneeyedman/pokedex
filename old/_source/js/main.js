/**
 * Incializamos el objeto PIKA
 */
PIKA.init = function() {
	PIKA.cache.init();
	PIKA.data.init();
}


// Si el DOM está listo, empezamos.
$(function() {
	PIKA.init();
});
