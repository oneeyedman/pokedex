/**
 * PIKA.Cache
 * Cachea elementos comunes
 *
 * @type {Object}
 */
PIKA.cache = {
	init : function(){
		PIKA.cache.$window = $(window);
		PIKA.cache.$html = $('html');
		PIKA.cache.$body = PIKA.cache.$html.find('body');
	}
};
