using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SkladisteAPI.Migrations
{
    /// <inheritdoc />
    public partial class NovaMigracija : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SkladisteProizvodi_Proizvodi_ProizvodID",
                table: "SkladisteProizvodi");

            migrationBuilder.DropForeignKey(
                name: "FK_SkladisteProizvodi_Skladista_SkladisteID",
                table: "SkladisteProizvodi");

            migrationBuilder.AlterColumn<int>(
                name: "SkladisteID",
                table: "SkladisteProizvodi",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ProizvodID",
                table: "SkladisteProizvodi",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Kolicina",
                table: "SkladisteProizvodi",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Popunjeno",
                table: "Skladista",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Naziv",
                table: "Skladista",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "Kapacitet",
                table: "Skladista",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Adresa",
                table: "Skladista",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Naziv",
                table: "Proizvodi",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Kategorija",
                table: "Proizvodi",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<float>(
                name: "Cena",
                table: "Proizvodi",
                type: "real",
                nullable: true,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AddForeignKey(
                name: "FK_SkladisteProizvodi_Proizvodi_ProizvodID",
                table: "SkladisteProizvodi",
                column: "ProizvodID",
                principalTable: "Proizvodi",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_SkladisteProizvodi_Skladista_SkladisteID",
                table: "SkladisteProizvodi",
                column: "SkladisteID",
                principalTable: "Skladista",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SkladisteProizvodi_Proizvodi_ProizvodID",
                table: "SkladisteProizvodi");

            migrationBuilder.DropForeignKey(
                name: "FK_SkladisteProizvodi_Skladista_SkladisteID",
                table: "SkladisteProizvodi");

            migrationBuilder.AlterColumn<int>(
                name: "SkladisteID",
                table: "SkladisteProizvodi",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ProizvodID",
                table: "SkladisteProizvodi",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Kolicina",
                table: "SkladisteProizvodi",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Popunjeno",
                table: "Skladista",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Naziv",
                table: "Skladista",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Kapacitet",
                table: "Skladista",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Adresa",
                table: "Skladista",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Naziv",
                table: "Proizvodi",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Kategorija",
                table: "Proizvodi",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<float>(
                name: "Cena",
                table: "Proizvodi",
                type: "real",
                nullable: false,
                defaultValue: 0f,
                oldClrType: typeof(float),
                oldType: "real",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SkladisteProizvodi_Proizvodi_ProizvodID",
                table: "SkladisteProizvodi",
                column: "ProizvodID",
                principalTable: "Proizvodi",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SkladisteProizvodi_Skladista_SkladisteID",
                table: "SkladisteProizvodi",
                column: "SkladisteID",
                principalTable: "Skladista",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
