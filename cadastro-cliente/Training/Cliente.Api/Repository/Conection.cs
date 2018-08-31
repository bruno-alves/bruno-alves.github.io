using System.Data;
using System.Data.SqlClient;

namespace Cliente.Api.Repository
{
    public abstract class Conection
    {
        protected Conection(string connectionString)
        {
            SqlConnection = new SqlConnection(connectionString);
        }

        private SqlConnection SqlConnection { get; set; }
        private SqlCommand SqlCommand { get; set; }

        public void SetProcedure(string queryName)
            => SqlCommand = new SqlCommand(queryName, SqlConnection) {CommandType = CommandType.StoredProcedure};

        public void SetParameter(string parameterName, object parameterValue)
            => SqlCommand.Parameters.AddWithValue(parameterName, parameterValue);

        public IDataReader ExecuteProcedureWithReader()
        {
            SqlConnection.Open();
            return SqlCommand.ExecuteReader();
        }

        public int ExecuteProcedureWithReturn()
        {
            SqlConnection.Open();
            AddReturnDefaultValue();
            SqlCommand.ExecuteNonQuery();
            return (int)SqlCommand.Parameters["@RETURN_VALUE"].Value;
        }

        private void AddReturnDefaultValue()
        {
            SqlCommand.Parameters.Add(new SqlParameter
            {
                ParameterName = "@RETURN_VALUE",
                Direction = ParameterDirection.ReturnValue,
                DbType = DbType.Int32
            });
        }
    }
}
