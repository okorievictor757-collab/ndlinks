// First 5 entries = top carousel, in this order. Then the rest fill the project grid.
// Put files in public/images/projects/ and public/videos/. Videos are silent; 'poster' is the still shown before play.
// Remove or add entries freely. Filters only appear for categories that have a project.
export const categories = ['All Projects','Borehole Drilling','Borehole Installation','Pump Installation','Pump Repairs','Borehole Fishing','Compression and Airlifting','Maintenance and Servicing','Camera Investigation','Solar Panel Installation']
const v = (id, category, title, caption, key, alt) => ({ id, category, title, caption, location:null, video:`/videos/${key}.mp4`, poster:`/images/projects/${key}-poster.jpg`, alt })
const i = (id, category, title, caption, file, alt) => ({ id, category, title, caption, location:null, image:`/images/projects/${file}`, alt })
export const projects = [
 v(1,'Borehole Drilling','Borehole drilling','Drilling a borehole on site.','drilling-1','Drilling rig at work on a borehole site'),
 v(2,'Borehole Drilling','Borehole drilling','Drilling in progress with the crew on site.','drilling-2','Drilling rig and crew working at a borehole site'),
 v(3,'Camera Investigation','Borehole camera investigation','Inspecting a borehole with a camera.','camera-1','Technician operating borehole camera equipment'),
 v(4,'Pump Installation','Borehole pump installation','Installing a pump and riser pipes.','pump-install-1','Technicians installing green riser pipes for a borehole pump'),
 v(5,'Borehole Fishing','Borehole pump fishing','Retrieving a pump from a borehole.','fishing-1','Pipe and flange at a borehole head during pump retrieval'),
 v(6,'Borehole Fishing','Borehole pump fishing','Working at the borehole head.','fishing-2','Borehole head and pipework on site'),
 v(7,'Camera Investigation','Down-the-hole camera investigation','Camera monitors showing the view inside a borehole.','camera-2','Camera monitors used for borehole investigation'),
 v(8,'Solar Panel Installation','Solar panel and solar pump installation','Solar panel structure on site.','solar-1','Solar panel mounting structure installed on site'),
 i(9,'Solar Panel Installation','Solar panel installation','Solar panels installed on a roof.','solar-2.jpg','Solar panels installed on a roof'),
 i(10,'Solar Panel Installation','Solar panel installation','Solar panel mounting structure.','solar-3.jpg','Solar panel mounting structure over a paved area'),
 i(11,'Camera Investigation','Borehole camera investigation','Camera monitors used for borehole inspection.','camera-3.jpg','Borehole camera monitors showing the inspection view'),
 i(12,'Maintenance and Servicing','Pump controller servicing','Servicing the electrical controller of a borehole pump.','servicing-1.jpg','Technician servicing a pump controller on a wall'),
 i(13,'Maintenance and Servicing','Pump controller servicing','Checking and testing a pump controller.','servicing-2.jpg','Technician testing a pump controller with a meter'),
 i(14,'Solar Panel Installation','Solar panel installation','Rows of solar panels installed on site.','solar-4.jpg','Rows of solar panels installed on site'),
]
