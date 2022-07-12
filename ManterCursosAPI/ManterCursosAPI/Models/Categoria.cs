using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CadastrosCursosAPI.Models
{
    public class Categoria
    {
        [Key]
        public int CategoriaID { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string Nome { get; set; }
    }
}
