import { Component, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent implements OnInit {
  member = input.required<Member>();

  constructor(private memberService: MembersService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(() => {
      this.toastr.success('You have liked ' + member.knownAs);
    });
  }

}