using System;
using System.Web.Http;

namespace Cliente.Api.Controllers
{
    public class PingController : ApiController
    {
        public IHttpActionResult Get() => Ok($"{DateTime.Now:F}");
    }
}
