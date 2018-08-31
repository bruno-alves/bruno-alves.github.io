namespace Cliente.Api.Repository.Dto
{
    public class ClienteDto
    {
        public int Sequencial { get; set; }
        public string CpfCnpj { get; set; }
        public string Nome { get; set; }
        public byte Idade { get; set; }
        public string Sexo { get; set; }
    }
}
