import { Controller, Post, Body, Get, UseGuards, Req, Param, Delete } from "@nestjs/common";
import { CreateUserDto } from "src/common/dtos/create-user.dto";
import { UsersService } from "./users.service";
import { Roles } from "src/common/decorators/roles.decorator/roles.decorator";
import { AuthGuard } from "src/common/guards/auth/auth.guard";
import { RolesGuard } from "src/common/guards/roles/roles.guard";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Get('/')
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async findAllUsers() {
    return this.userService.findAll();
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async findUserById(@Param('id') id: string) {
    return this.userService.findById(id);
  }
  @Post('/:id')
  @UseGuards(AuthGuard)
  async updateUserById(@Param('id') id: string , @Body() updateUserDto: CreateUserDto) {
    return this.userService.updateUser(id,updateUserDto);
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
