using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CadastrosCursosAPI.Models
{
    public class Curso
    {
        [Key]
        public int CursoID { get; set; }

        [Required]
        [Column(TypeName = "varchar(300)")]
        public string DescricaoCurso { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Column(TypeName = "DateTime")] 
        public DateTime DataInicio { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        [Column(TypeName = "DateTime")]
        public DateTime Datatermino { get; set; }

        [Column(TypeName = "int")]
        public int QuantidadeAlunos { get; set; }

        
        [Required, ForeignKey("Categoria")]
        public int CategoriaID { get; set; }

        [JsonIgnore]
        public virtual Categoria Categoria { get; set; }

    }
}
