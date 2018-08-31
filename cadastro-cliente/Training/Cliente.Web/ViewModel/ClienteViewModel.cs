namespace Cliente.Web.ViewModel
{
    public class ClienteViewModel
    {
        public int Sequencial { get; set; }
        public string CpfCnpj { get; set; }
        public string Nome { get; set; }
        public byte Idade { get; set; }
        public string Sexo { get; set; }

        public string IdadeFormatada => Idade != default(int) ? Idade.ToString() : string.Empty;
    }
}
