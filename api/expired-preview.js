const {renderExpiredPage} = require('./wtf');

// Safe visual preview: deliberately HTTP 200. Actual expired roster still returns 410.
module.exports = function(req,res){
 res.setHeader('Content-Type','text/html; charset=utf-8');
 res.setHeader('Cache-Control','private, no-store, max-age=0');
 res.setHeader('CDN-Cache-Control','no-store');
 res.setHeader('Vercel-CDN-Cache-Control','no-store');
 res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');
 res.statusCode=200;
 res.end(renderExpiredPage());
};
