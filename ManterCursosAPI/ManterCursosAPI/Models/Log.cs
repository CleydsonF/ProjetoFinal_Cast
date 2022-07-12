using CadastrosCursosAPI.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ManterCursosAPI.Models
{
    public class Log
    {
        [Key]
        public int LogID { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [Column(TypeName = "Date")]
        public DateTime DataInclusao { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [Column(TypeName = "Date")]
        public DateTime UltimaAtualizacao { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Acao { get; set; }

        [Required]
        [Column(TypeName = "varchar(50)")]
        public string Curso { get; set; }

        [Required, ForeignKey("Usuario")]
        public int UsuarioID { get; set; }

        [JsonIgnore]
        public virtual Usuario Usuario { get; set; }

    }
}
