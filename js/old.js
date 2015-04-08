var voronoi = new Voronoi();
var bbox = {xl: 0, xr: 1600, yt: 0, yb: 1600}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
var sites = [];
for (var i = 0; i < (1600/20); i++)
    for (var j = 0; j < 1600; j+=20) {
        sites.push({x: j + ((i % 2) * 10), y: i*20});
    }
//var g_width = 10;
//for (var i = 0; i < (1600/g_width); i++)
//        for (var j = 0; j < (1600/g_width); j++) {
//            sites.push({x: i*g_width, y: j*g_width});
//        }
var diagram = voronoi.compute(sites, bbox);


noise.seed(Math.random());


var stage = new PIXI.Stage(0x66FF99);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(1600, 1600);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

var graphics = new PIXI.Graphics();
//graphics.lineStyle ( 2 , 0xFFFFFF,  1);
//    graphics.beginFill(0xffffff);
//    for (var i=0;i < sites.length;i++)
//        graphics.drawCircle(sites[i].x, sites[i].y, 2);
console.log(diagram.cells);
var col = 0x000000;
var cells = diagram.cells,
    iCell = cells.length,
    cell,
    halfedges, nHalfedges, iHalfedge, v;
while (iCell--) {
    cell = cells[iCell];
    halfedges = cell.halfedges;
    nHalfedges = halfedges.length;
    if (nHalfedges) {
        v = halfedges[0].getStartpoint();
        var total = 0.0;
        var frequency = 1.0/800;
        var gain = 0.50;
        var lacunarity = 2;
        var octaves = 16;
        var amplitude = gain;

        for (i = 0; i < octaves; ++i)
        {
            total += noise.simplex2(v.x * frequency, v.y * frequency) * amplitude;
            frequency *= lacunarity;
            amplitude *= gain;
        }

//now that we have the value, put it in
        if (total > 1) total =1;
        if (total < -1) total = -1;
        var value = total + 1;
        var thresh = 0.75;
        //graphics.beginFill((value+1)*128);
        if (value > thresh) {
            value -= (thresh);
            value /= (2-thresh);
//                graphics.beginFill((255 * value << 16) + (255 << 8) + (255 * value));
            if (value < 1)
                graphics.beginFill(0xFFFFFF);
            if (value < 0.85)
                graphics.beginFill(0x806E6E);
            if (value < 0.55)
                graphics.beginFill(0xC571A);
            if (value < 0.35)
                graphics.beginFill(0x6FE873);
            if (value < 0.15)
                graphics.beginFill(0xFFFCAB);
        }
        else {
            value /= thresh;
            graphics.beginFill((255 * 0 << 16) + (255 * 0 << 8) + (255 * value));
        }
        graphics.moveTo(v.x,v.y);
        for (iHalfedge=0; iHalfedge<nHalfedges; iHalfedge++) {
            v = halfedges[iHalfedge].getEndpoint();
            graphics.lineTo(v.x,v.y);
        }
        graphics.endFill()
    }

}







//    var edges = diagram.edges,
//            nEdges = edges.length,
//            v;
//
//    if (nEdges) {
//        var edge;
//        while (nEdges--) {
//            edge = edges[nEdges];
//            v = edge.va;
//            graphics.moveTo(v.x,v.y);
//            v = edge.vb;
//            graphics.lineTo(v.x,v.y);
//        }
//        //ctx.stroke();
//    }


stage.addChild(graphics);

renderer.render(stage);/**
 * Created by Mark on 2015/04/07.
 */



var c_width = 1600, c_height = 800;
var voronoi = new Voronoi();
var bbox = {xl: 0, xr: c_width, yt: 0, yb: c_height}; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
var sites = [];
//    for (var i = 0; i < (1600/20); i++)
//        for (var j = 0; j < 1600; j+=20) {
//            sites.push({x: j + ((i % 2) * 10), y: i*20});
//        }
//var g_width = 10;
//for (var i = 0; i < (1600/g_width); i++)
//        for (var j = 0; j < (1600/g_width); j++) {
//            sites.push({x: i*g_width, y: j*g_width});
//        }
for (var i = 0; i < 5000; i++)
{
    var x = Math.random() * c_width;
    var y =Math.random() * c_height;
    sites.push({x:x, y:y});
}
var diagram = voronoi.compute(sites, bbox);


noise.seed(Math.random());


var stage = new PIXI.Stage(0x66FF99);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(c_width, c_height);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

var graphics = new PIXI.Graphics();
//    console.log(diagram.cells);
var col = 0x000000;
var cells = diagram.cells,
    iCell = cells.length,
    cell,
    halfedges, nHalfedges, iHalfedge, v;
while (iCell--) {
    cell = cells[iCell];
    halfedges = cell.halfedges;
    nHalfedges = halfedges.length;
    if (nHalfedges) {
        v = halfedges[0].getStartpoint();

//now that we have the value, put it in


        graphics.beginFill((255 * 0 << 16) + (255 * 0 << 8) + (255 * 1));

        graphics.moveTo(v.x,v.y);
        for (iHalfedge=0; iHalfedge<nHalfedges; iHalfedge++) {
            v = halfedges[iHalfedge].getEndpoint();
            graphics.lineTo(v.x,v.y);
        }
        graphics.endFill()
    }

}






graphics.lineStyle ( 1 , 0xFFFFFF,  2);
var edges = diagram.edges,
    nEdges = edges.length,
    v;

if (nEdges) {
    var edge;
    while (nEdges--) {
        graphics.lineStyle ( 1 , 0xFFFFFF,  1);
        edge = edges[nEdges];
        v = edge.va;
        graphics.moveTo(v.x,v.y);
        v = edge.vb;
        graphics.lineTo(v.x,v.y);
    }
    //ctx.stroke();
}



stage.addChild(graphics);
//    stage.addChild(points);
renderer.render(stage);