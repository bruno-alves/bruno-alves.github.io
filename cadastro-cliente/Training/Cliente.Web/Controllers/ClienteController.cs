using Cliente.Web.ViewModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Mvc;

namespace Cliente.Web.Controllers
{
    public class ClienteController : Controller
    {
        public ActionResult Index() => View();

        public ActionResult Get()
        {
            try
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    httpClient.BaseAddress = new Uri("http://localhost:8001/api/Cliente/Get");
                    var request = httpClient.GetAsync("").Result;

                    if (!request.IsSuccessStatusCode)
                        return Content("Deu Errado");

                    var json = request.Content.ReadAsStringAsync().Result;
                    var dadosCliente = JsonConvert.DeserializeObject<IEnumerable<ClienteViewModel>>(json);

                   return View("_Grid", dadosCliente);
                }
            }
            catch (Exception ex)
            {
                return Content($"Deu pau -> {ex.Message}");
            }
        }

        public ActionResult GetDadosCliente(int? sequencial)
        {
            try
            {
                if (!sequencial.HasValue)
                    return View("_CadastroEdicao", new ClienteViewModel());

                using (HttpClient httpClient = new HttpClient())
                {
                    httpClient.BaseAddress = new Uri($"http://localhost:8001/api/Cliente/Get?Sequencial={sequencial}");
                    var request = httpClient.GetAsync("").Result;

                    if (!request.IsSuccessStatusCode)
                        return Content("Deu Errado");

                    var json = request.Content.ReadAsStringAsync().Result;
                    var dadosCliente = JsonConvert.DeserializeObject<ClienteViewModel>(json);

                    return View("_CadastroEdicao", dadosCliente);
                }
            }
            catch (Exception ex)
            {
                return Content($"Deu pau -> {ex.Message}");
            }
        }

        public ActionResult Post(ClienteViewModel cliente)
        {
            try
            {
                using (HttpClient httpCliente = new HttpClient())
                {
                    var request = httpCliente.PostAsync("http://localhost:8001/api/Cliente/Post", 
                        new ObjectContent<ClienteViewModel>(cliente, new JsonMediaTypeFormatter())).Result;

                    if (!request.IsSuccessStatusCode)
                        return Content("Deu Errado");

                    return Content("Cadastrado");
                }
            }
            catch (Exception ex)
            {
                return Content($"Deu pau -> {ex.Message}");
            }
        }

        public ActionResult Put(ClienteViewModel cliente)
        {
            try
            {
                using (HttpClient httpCliente = new HttpClient())
                {
                    var request = httpCliente.PutAsync("http://localhost:8001/api/Cliente/Put",
                        new ObjectContent<ClienteViewModel>(cliente, new JsonMediaTypeFormatter())).Result;

                    if (!request.IsSuccessStatusCode)
                        return Content("Deu Errado");

                    return Content("Editado");
                }
            }
            catch (Exception ex)
            {
                return Content($"Deu pau -> {ex.Message}");
            }
        }

        public ActionResult Delete(int sequencial)
        {
            try
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    httpClient.BaseAddress = new Uri($"http://localhost:8001/api/Cliente/Delete?Sequencial={sequencial}");
                    var request = httpClient.DeleteAsync("");

                    if (!request.Result.IsSuccessStatusCode)
                        return Content("Deu Errado");

                    return Content("Excluido");
                }
            }
            catch (Exception ex)
            {
                return Content($"Deu pau -> {ex.Message}");
            }
        }
    }
}
