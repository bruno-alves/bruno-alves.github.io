using System.Net.Http.Headers;
using System.Web.Http;

namespace Cliente.Api
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute("Ping", "", new {controller = "Ping", action = "Get"});
            config.Routes.MapHttpRoute("DefaultApi", "api/{controller}/{action}", new {controller = "Ping", action = RouteParameter.Optional });
      
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
        }
    }
}
