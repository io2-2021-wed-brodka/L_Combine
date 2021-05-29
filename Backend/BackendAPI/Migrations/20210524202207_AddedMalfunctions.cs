using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BackendAPI.Migrations
{
    public partial class AddedMalfunctions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Malfunctions",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DetectionDate = table.Column<DateTime>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    BikeID = table.Column<int>(nullable: false),
                    ReportingUserID = table.Column<int>(nullable: false),
                    State = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Malfunctions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Malfunctions_Bikes_BikeID",
                        column: x => x.BikeID,
                        principalTable: "Bikes",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Malfunctions_Users_ReportingUserID",
                        column: x => x.ReportingUserID,
                        principalTable: "Users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Malfunctions_BikeID",
                table: "Malfunctions",
                column: "BikeID");

            migrationBuilder.CreateIndex(
                name: "IX_Malfunctions_ReportingUserID",
                table: "Malfunctions",
                column: "ReportingUserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Malfunctions");
        }
    }
}
