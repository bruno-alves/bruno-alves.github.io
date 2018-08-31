using Cliente.Api.Repository.Dto;
using System.Collections.Generic;

namespace Cliente.Api.Repository
{
    public class ClienteRepository : Conection
    {
        public ClienteRepository() : base(@"Data Source=BRUNO-ALVES-PC\SQLEXPRESS;Initial Catalog=Nightmare;Integrated Security=True")
        {

        }

        public IEnumerable<ClienteDto> Get()
        {
            SetProcedure("SP_SelClientes");

            var data = new List<ClienteDto>();

            using (var r = ExecuteProcedureWithReader())
                while (r.Read())
                    data.Add(new ClienteDto
                    {
                        Sequencial = (int)r.GetValue(r.GetOrdinal("Sequencial")),
                        CpfCnpj = r.GetValue(r.GetOrdinal("CPFCNPJ")).ToString(),
                        Nome = r.GetValue(r.GetOrdinal("Nome")).ToString(),
                        Idade = (byte)r.GetValue(r.GetOrdinal("Idade")),
                        Sexo = r.GetValue(r.GetOrdinal("Sexo")).ToString()
                    });

            return data;
        }

        public ClienteDto Get(int sequencial)
        {
            SetProcedure("SP_SelDadosCliente");
            SetParameter("@Sequencial", sequencial);

            using (var r = ExecuteProcedureWithReader())
                if (r.Read())
                    return new ClienteDto
                    {
                        Sequencial = (int) r.GetValue(r.GetOrdinal("Sequencial")),
                        CpfCnpj = r.GetValue(r.GetOrdinal("CPFCNPJ")).ToString(),
                        Nome = r.GetValue(r.GetOrdinal("Nome")).ToString(),
                        Idade = (byte) r.GetValue(r.GetOrdinal("Idade")),
                        Sexo = r.GetValue(r.GetOrdinal("Sexo")).ToString()
                    };

            return null;
        }

        public int Put(ClienteDto cliente)
        {
            SetProcedure("SP_UpdClientes");
            SetParameter("@Sequencial", cliente.Sequencial);
            SetParameter("@CPFCNPJ", cliente.CpfCnpj);
            SetParameter("@Nome", cliente.Nome);
            SetParameter("@Idade", cliente.Idade);
            SetParameter("@Sexo", cliente.Sexo);

            return ExecuteProcedureWithReturn();
        }

        public int Post(ClienteDto cliente)
        {
            SetProcedure("SP_InsCliente");
            SetParameter("@CPFCNPJ", cliente.CpfCnpj);
            SetParameter("@Nome", cliente.Nome);
            SetParameter("@Idade", cliente.Idade);
            SetParameter("@Sexo", cliente.Sexo);

           return ExecuteProcedureWithReturn();
        }

        public int Delete(int sequencial)
        {
            SetProcedure("SP_DelCliente");
            SetParameter("@Sequencial", sequencial);

            return ExecuteProcedureWithReturn();
        }
    }
}
