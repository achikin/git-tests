var canvas_width
var canvas_height
var canvas_center_x
var canvas_center_y

var hours_count

var hours_step_angle
var minutes_step_angle
var seconds_step_angle
var h_to_m_step_angle
var m_to_s_step_angle

var clock_radius
var mark_length

var arrow_canvas_element
var arrow_canvas_context
function setup_clock(width, height) {
	mark_length = 20
	hours_count = 12
	canvas_center_x = width / 2
	canvas_center_y = height / 2
  canvas_width = width
	canvas_height = height
	hours_step_angle = 2 * Math.PI / hours_count
	minutes_step_angle = 2 * Math.PI / 60
	seconds_step_angle = minutes_step_angle
	h_to_m_step_angle = hours_step_angle / 60
	m_to_s_step_angle = minutes_step_angle / 60

	clock_radius = width > height ? (height - 50) / 2 : (width - 50) / 2
	window.requestAnimFrame = (function(){
	      return  window.requestAnimationFrame       || 
	              window.webkitRequestAnimationFrame || 
	              window.mozRequestAnimationFrame    || 
	              window.oRequestAnimationFrame      || 
	              window.msRequestAnimationFrame     || 
	              function(/* function */ callback, /* DOMElement */ element){
									                window.setTimeout(callback, 1000 / 60);
																	              };
    })();	

}
function anim_loop() {
	arrow_canvas_context.clearRect(0, 0, canvas_width, canvas_height);
	draw_grid(arrow_canvas_context, canvas_width, canvas_height);
	draw_hour_marks(arrow_canvas_context, clock_radius);
	draw_arrows(arrow_canvas_context, canvas_width, canvas_height);
	window.requestAnimFrame(anim_loop, arrow_canvas_element);
}
function draw_first_canvas_grid() {
	arrow_canvas_element = document.getElementById("first_canvas")
	arrow_canvas_context = arrow_canvas_element.getContext("2d")
	setup_clock(arrow_canvas_element.width, arrow_canvas_element.height)
	anim_loop()
}
function draw_first_canvas() {
	var first_canvas = document.getElementById("first_canvas")
	var context = first_canvas.getContext("2d")
	context.fillRect(50,50,100,100)
}
function draw_grid(context, max_x, max_y) {
	var step = max_x / 20
	size_x = max_x * Math.sqrt(2) * 2
	size_y = max_y * Math.sqrt(2) * 2
	var center_x = size_x / 2
	var center_y = size_y / 2
	context.save()
	context.translate(max_x/2, max_y/2)
	context.rotate(Math.PI/3)
	for(var i = 0.5; i < size_x; i += step) {
		context.moveTo(i - center_x, 0 - center_y)
		context.lineTo(i - center_x, size_y - center_y)
	}
	for(var i = 0.5; i < size_y; i+=step) {
		context.moveTo(0 - center_x, i-center_y)
		context.lineTo(size_x-center_x,i-center_y)
	}
	context.strokeStyle = "#bbb"
	context.stroke()
	context.restore()
}
function draw_hour_marks(context, radius) {
	context.save()
	context.beginPath()
	context.translate(canvas_center_x, canvas_center_y)
  for(var i = 0; i < hours_count; i++){
		context.moveTo(0, -radius+mark_length)
		context.lineTo(0, -radius)
		context.rotate(hours_step_angle)
	}	
	context.strokeStyle = "#f00"
	context.stroke()
	context.restore()
}
function draw_arrows(context)
{
	var date = new Date()
	var hours = date.getHours()
	var minutes = date.getMinutes()
	var seconds = date.getSeconds()
	var seconds_arrow_length = clock_radius - mark_length - 10
	var minute_arrow_length = seconds_arrow_length / 10 * 8
	var hour_arrow_length = seconds_arrow_length / 10 * 6

	context.beginPath()

	context.save()
		context.strokeStyle = "#0f0"
		context.translate(canvas_center_x, canvas_center_y)

		context.save()
			context.beginPath()
			context.rotate(hours * hours_step_angle + minutes * h_to_m_step_angle)
			context.moveTo(0,0)
			context.lineTo(0, -hour_arrow_length)
			context.stroke()
  	context.restore()

		context.save()
			context.beginPath()
			context.rotate(minutes * minutes_step_angle + seconds * m_to_s_step_angle)
			context.moveTo(0,0)
			context.lineTo(0, -minute_arrow_length)
			context.stroke()
		context.restore()
	
		context.rotate(seconds * seconds_step_angle)
		context.beginPath()
		context.moveTo(0,0)
		context.lineTo(0, -seconds_arrow_length)
		context.stroke()
	context.restore()
}
