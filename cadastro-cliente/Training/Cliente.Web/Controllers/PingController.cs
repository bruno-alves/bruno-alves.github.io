using System;
using System.Web.Mvc;

namespace Cliente.Web.Controllers
{
    public class PingController : Controller
    {
        public ActionResult Index()
        {
            return new JsonResult {Data = $"{DateTime.Now:F}", JsonRequestBehavior = JsonRequestBehavior.AllowGet};
        }    
    }
}
