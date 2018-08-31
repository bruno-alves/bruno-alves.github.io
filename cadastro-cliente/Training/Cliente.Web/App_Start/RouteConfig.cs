using System.Web.Mvc;
using System.Web.Routing;

namespace Cliente.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapMvcAttributeRoutes();

            routes.MapRoute("Ping", "", new { controller = "Ping", action = "Index" });
            routes.MapRoute("Default", "{controller}/{action}", new {controller = "Ping", action = "Index"});
        }
    }
}
