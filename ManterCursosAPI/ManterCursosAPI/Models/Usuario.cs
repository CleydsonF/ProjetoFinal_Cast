using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ManterCursosAPI.Models
{
    public class Usuario
    {
        [Key]
        public int UsuarioID { get; set; }

        [Required]
        [Column(TypeName = "varchar(100)")]
        public string NomeUsuario { get; set; }

        [Required(ErrorMessage = "The Email field is required.")]
        [EmailAddress(ErrorMessage = "The Email field is not a valid e-mail address.")]
        [Column(TypeName = "varchar(100)")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        [Column(TypeName = "varchar(100)")]
        public string Senha { get; set; }

        [Required(ErrorMessage = "As senhas devem ser iguais")]
        [DataType(DataType.Password)]
        [Compare("Senha")]
        public string ConfirmaSenha { get; set; }
    }
}
