using Microsoft.EntityFrameworkCore.Migrations;

namespace BackendAPI.Migrations
{
    public partial class AddedRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Users",
                maxLength: 10,
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 1,
                column: "Role",
                value: "User");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 2,
                column: "Role",
                value: "User");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 3,
                column: "Role",
                value: "User");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 4,
                column: "Role",
                value: "User");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 5,
                column: "Role",
                value: "User");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "ID", "LastName", "Login", "Name", "PasswordHash", "Role" },
                values: new object[,]
                {
                    { 6, "PostmanAdminLastName", "PostmanAdmin", "PostmanAdminName", "acd1b21d80c9c5cc1d13dfd449a37283a0b5451eb87134fc1d26af237a2a1a5a", "Admin" },
                    { 7, "PostmanTechLastName", "PostmanTech", "PostmanTechName", "8dd6a6084b509a081aed96e004d4a7dcb378a97a6bfcb39bd197be368fa4569a", "Tech" },
                    { 8, "NazwiskoAdmina", "admin", "ImieAdmina", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", "Admin" },
                    { 9, "NazwiskoTecha", "tech", "ImieTecha", "fe9bbd400bb6cb314531e3462507661401959afc69aae96bc6aec2c213b83bc1", "Tech" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "ID",
                keyValue: 9);

            migrationBuilder.DropColumn(
                name: "Role",
                table: "Users");
        }
    }
}
