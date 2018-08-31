using Cliente.Api.Repository.Dto;
using System.Web.Http;
using Cliente.Api.Repository;

namespace Cliente.Api.Controllers
{
    public class ClienteController : ApiController
    {
        private readonly ClienteRepository _clienteRepository = new ClienteRepository();

        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(_clienteRepository.Get());
        }

        [HttpGet]
        public IHttpActionResult Get(int sequencial)
        {
            return Ok(_clienteRepository.Get(sequencial));
        }

        [HttpPut]
        public IHttpActionResult Put(ClienteDto cliente)
        {
            var request = _clienteRepository.Put(cliente);
            if (request == 0)
                return Ok();

            return BadRequest();
        }

        [HttpPost]
        public IHttpActionResult Post(ClienteDto cliente)
        {
            var request = _clienteRepository.Post(cliente);
            if (request == 0)
                return Ok();

            return BadRequest();
        }

        [HttpDelete]
        public IHttpActionResult Delete(int sequencial)
        {
            var request = _clienteRepository.Delete(sequencial);
            if (request == 0)
                return Ok();

            return BadRequest();
        }
    }
}
